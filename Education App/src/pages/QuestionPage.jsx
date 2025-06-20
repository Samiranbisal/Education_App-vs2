import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  increment,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { formatDistanceToNow } from "date-fns";
import "./QuestionPage.css";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState({});
  const [editingQuestions, setEditingQuestions] = useState({});
  const [editingAnswers, setEditingAnswers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [answerUnsubscribers, setAnswerUnsubscribers] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrentUser({ uid: user.uid, ...userSnap.data() });
        }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const qRef = query(collection(db, "questions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(qRef, (snapshot) => {
      const tempQuestions = [];
      answerUnsubscribers.forEach((unsub) => unsub());
      const newUnsubs = [];

      snapshot.forEach((docSnap) => {
        const qData = { ...docSnap.data(), id: docSnap.id, answers: [] };
        tempQuestions.push(qData);

        const answersRef = collection(db, `questions/${docSnap.id}/answers`);
        const answersQuery = query(answersRef, orderBy("createdAt"));
        const unsubAnswers = onSnapshot(answersQuery, (ansSnap) => {
          const updatedAnswers = ansSnap.docs.map((a) => ({
            id: a.id,
            ...a.data(),
          }));
          setQuestions((prev) =>
            prev.map((q) => (q.id === docSnap.id ? { ...q, answers: updatedAnswers } : q))
          );
        });

        newUnsubs.push(unsubAnswers);
      });

      setQuestions(tempQuestions);
      setAnswerUnsubscribers(newUnsubs);
    });

    return () => {
      unsubscribe();
      answerUnsubscribers.forEach((unsub) => unsub());
    };
  }, []);

  const submitQuestion = async () => {
    if (newQuestion.trim() && currentUser) {
      await addDoc(collection(db, "questions"), {
        text: newQuestion,
        createdAt: new Date().toISOString(),
        uid: currentUser.uid,
        username: currentUser.username,
        role: currentUser.role,
      });
      setNewQuestion("");
    }
  };

  const submitAnswer = async (qid) => {
    if (newAnswer[qid]?.trim() && currentUser) {
      await addDoc(collection(db, `questions/${qid}/answers`), {
        text: newAnswer[qid],
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        uid: currentUser.uid,
        username: currentUser.username,
        role: currentUser.role,
      });
      setNewAnswer({ ...newAnswer, [qid]: "" });
    }
  };

  const handleLike = async (qid, aid, type) => {
    const ref = doc(db, `questions/${qid}/answers/${aid}`);
    await updateDoc(ref, { [type]: increment(1) });
  };

  const updateQuestion = async (qid) => {
    if (editingQuestions[qid]?.trim()) {
      await updateDoc(doc(db, "questions", qid), {
        text: editingQuestions[qid],
        lastEditedBy: currentUser.username,
        lastEditedAt: new Date().toISOString(),
      });
      const { [qid]: _, ...rest } = editingQuestions;
      setEditingQuestions(rest);
    }
  };

  const cancelEditQuestion = (qid) => {
    const { [qid]: _, ...rest } = editingQuestions;
    setEditingQuestions(rest);
  };

  const deleteQuestion = async (qid) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await deleteDoc(doc(db, "questions", qid));
    }
  };

  const updateAnswer = async (qid, aid) => {
    if (editingAnswers[aid]?.trim()) {
      await updateDoc(doc(db, `questions/${qid}/answers/${aid}`), {
        text: editingAnswers[aid],
        lastEditedBy: currentUser.username,
        lastEditedAt: new Date().toISOString(),
      });
      const { [aid]: _, ...rest } = editingAnswers;
      setEditingAnswers(rest);
    }
  };

  const cancelEditAnswer = (aid) => {
    const { [aid]: _, ...rest } = editingAnswers;
    setEditingAnswers(rest);
  };

  const deleteAnswer = async (qid, aid) => {
    if (window.confirm("Delete this answer?")) {
      await deleteDoc(doc(db, `questions/${qid}/answers/${aid}`));
    }
  };

  return (
    <div className="qa-container">
      <h2>📚 Q&A Forum</h2>

      <div className="qa-new-question">
        <textarea
          rows={3}
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitQuestion();
            }
          }}
          placeholder="Ask your question..."
        />
        <button onClick={submitQuestion}>Submit Question</button>
      </div>

      {questions.map((q) => (
        <div key={q.id} className="qa-question-box">
          {editingQuestions[q.id] !== undefined ? (
            <>
              <textarea
                rows={2}
                value={editingQuestions[q.id]}
                onChange={(e) =>
                  setEditingQuestions({ ...editingQuestions, [q.id]: e.target.value })
                }
              />
              <button onClick={() => updateQuestion(q.id)}>Save</button>
              <button onClick={() => cancelEditQuestion(q.id)}>Cancel</button>
            </>
          ) : (
            <>
              <h4>❓ {q.text}</h4>
              <p className="qa-meta">
                Posted by: <strong>{q.username}</strong> ({q.role}) •{" "}
                {formatDistanceToNow(new Date(q.createdAt), { addSuffix: true })}
                {q.lastEditedBy && (
                  <>
                    {" "}• Edited by <strong>{q.lastEditedBy}</strong>{" "}
                    {q.lastEditedAt && (
                      <>({formatDistanceToNow(new Date(q.lastEditedAt), { addSuffix: true })})</>
                    )}
                  </>
                )}
              </p>
              {currentUser?.uid === q.uid && (
                <>
                  <button onClick={() => setEditingQuestions({ ...editingQuestions, [q.id]: q.text })}>✏️ Edit</button>
                  <button onClick={() => deleteQuestion(q.id)}>🗑️ Delete</button>
                </>
              )}
            </>
          )}

          <div className="qa-answers">
            {q.answers.map((a) => (
              <div
                key={a.id}
                className={`qa-answer ${a.role === "teacher" ? "teacher-answer" : ""}`}
              >
                {editingAnswers[a.id] !== undefined ? (
                  <>
                    <textarea
                      rows={2}
                      value={editingAnswers[a.id]}
                      onChange={(e) =>
                        setEditingAnswers({ ...editingAnswers, [a.id]: e.target.value })
                      }
                    />
                    <button onClick={() => updateAnswer(q.id, a.id)}>Save</button>
                    <button onClick={() => cancelEditAnswer(a.id)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p>{a.role === "teacher" ? "👩‍🏫" : "💬"} {a.text}</p>
                    <p className="qa-meta">
                      — {a.username} ({a.role}) •{" "}
                      {formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}
                      {a.lastEditedBy && (
                        <>
                          {" "}• Edited by <strong>{a.lastEditedBy}</strong>{" "}
                          {a.lastEditedAt && (
                            <>({formatDistanceToNow(new Date(a.lastEditedAt), { addSuffix: true })})</>
                          )}
                        </>
                      )}
                    </p>
                    <button onClick={() => handleLike(q.id, a.id, "likes")}>👍 {a.likes}</button>
                    <button onClick={() => handleLike(q.id, a.id, "dislikes")}>👎 {a.dislikes}</button>
                    {currentUser?.uid === a.uid && (
                      <>
                        <button onClick={() => setEditingAnswers({ ...editingAnswers, [a.id]: a.text })}>✏️ Edit</button>
                        <button onClick={() => deleteAnswer(q.id, a.id)}>🗑️ Delete</button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <textarea
            rows={2}
            value={newAnswer[q.id] || ""}
            onChange={(e) => setNewAnswer({ ...newAnswer, [q.id]: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitAnswer(q.id);
              }
            }}
            placeholder="Write your answer..."
            style={{ width: "90%", marginTop: 10 }}
          />
          <button onClick={() => submitAnswer(q.id)}>Reply</button>
        </div>
      ))}
    </div>
  );
};

export default QuestionPage;
