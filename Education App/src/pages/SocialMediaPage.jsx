// SocialMediaPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  FaComment,
  FaShare,
  FaWhatsapp,
  FaUserCircle,
  FaUpload,
} from 'react-icons/fa';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  increment,
  arrayUnion,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './SocialMediaPage.css';

const CLOUD_NAME = "dde5qsuw9";
const UPLOAD_PRESET = "collage_project";

const REACTIONS = [
  { emoji: "👍", field: "likeCount" },
  { emoji: "❤️", field: "loveCount" },
  { emoji: "😂", field: "funnyCount" },
];

const SocialMediaPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUser({ uid: user.uid, ...docSnap.data() });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allPosts = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((post) => !post.deleted);
      setPosts(allPosts);

      const allComments = {};
      allPosts.forEach((post) => {
        allComments[post.id] = post.comments || [];
      });
      setComments(allComments);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
      setAllUsers(users);
    });
    return () => unsubscribe();
  }, []);

  const handleReaction = async (postId, field) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { [field]: increment(1) });
  };

  const handleCommentSubmit = async (postId, text) => {
    if (!text || !currentUser) return;
    const commentData = {
      user: currentUser.username,
      text,
      createdAt: new Date().toISOString(),
    };
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion(commentData),
    });
  };

  const handleWhatsAppShare = (text) => {
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !currentUser || !title) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        formData
      );

      const mediaUrl = res.data.secure_url;
      const type = file.type.startsWith("video") ? "video" : "image";

      const taggedUsernames = Array.from(
        new Set(title.match(/@(\w+)/g)?.map((tag) => tag.slice(1)) || [])
      );

      const newPost = {
        title,
        user: {
          name: currentUser?.username || "Unknown",
          avatar: currentUser?.avatar || null,
          email: currentUser?.email || "",
          role: currentUser?.role || "",
          uid: currentUser?.uid || "",
        },
        content: "My new post!",
        media: mediaUrl,
        type,
        likeCount: 0,
        loveCount: 0,
        funnyCount: 0,
        comments: [],
        tags: taggedUsernames,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "posts"), newPost);
      setTitle("");
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed! Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    await updateDoc(doc(db, "posts", postId), { deleted: true });
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleSaveEdit = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      title: editedTitle,
      content: editedContent,
    });
    setEditingPostId(null);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  const triggerUploadInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="social-container">
      <div className="search-section">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => {
            const value = e.target.value;
            setSearchInput(value);
            setFilteredUsers(
              allUsers.filter(
                (user) =>
                  user.username &&
                  user.username.toLowerCase().includes(value.toLowerCase())
              )
            );
          }}
          placeholder="Search or tag user by username"
          className="social-input"
        />

        {searchInput.length >= 2 && filteredUsers.length > 0 && (
          <div className="user-suggestions">
            {filteredUsers.map((user) => (
              <div
                key={user.uid}
                className="suggestion"
                onClick={() => {
                  setTitle((prev) => prev + ` @${user.username}`);
                  setSearchInput("");
                  setFilteredUsers([]);
                  setFilter(user.uid);
                }}
              >
                🔍 @{user.username} ({user.role}) — View Posts
              </div>
            ))}
          </div>
        )}
      </div>

      {filter && filter !== "all" && (
        <button onClick={() => setFilter("all")} className="comment-button clear-filter">
          Clear User Filter
        </button>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") triggerUploadInput();
        }}
        placeholder="Enter post headline and press Enter to upload"
        className="social-input"
      />
      <label className="upload-label">
        <FaUpload /> Upload Image/Video
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
      </label>
      {uploading && <p>Uploading...</p>}

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={`comment-button ${filter === "all" ? "active-filter" : ""}`}>All</button>
        <button onClick={() => setFilter("image")} className={`comment-button ${filter === "image" ? "active-filter" : ""}`}>Images Only</button>
        <button onClick={() => setFilter("video")} className={`comment-button ${filter === "video" ? "active-filter" : ""}`}>Reels Only</button>
      </div>

      {posts.filter((post) => {
        if (filter === "image") return post.type === "image";
        if (filter === "video") return post.type === "video";
        if (filter && filter !== "all") return post.user.uid === filter;
        return true;
      }).map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            {post.user.avatar ? (
              <img src={post.user.avatar} alt="avatar" className="avatar" />
            ) : (
              <FaUserCircle size={40} />
            )}
            <div>
              <Link to={`/profile/${post.user.uid}`} className="username">
                {post.user.name} ({post.user.role})
              </Link>
              <br />
              <small>{post.user.email}</small>
              <br />
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </div>
          </div>

          {editingPostId === post.id ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="social-input"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="social-input"
                rows={3}
              />
              <div className="edit-actions">
                <button onClick={() => handleSaveEdit(post.id)} className="comment-button">Save</button>
                <button onClick={handleCancelEdit} className="comment-button cancel">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>
                {post.title.split(" ").map((word, i) =>
                  word.startsWith("@") ? (
                    <span key={i} className="tagged">{word} </span>
                  ) : (
                    word + " "
                  )
                )}
              </h3>
              <p>{post.content}</p>
            </>
          )}

          {post.type === "image" ? (
            <img src={post.media} alt="post" className="media" />
          ) : (
            <video controls className="media">
              <source src={post.media} type="video/mp4" />
            </video>
          )}

          <div className="actions">
            {REACTIONS.map(({ emoji, field }) => (
              <button
                key={field}
                onClick={() => handleReaction(post.id, field)}
                className="reaction-button"
              >
                {emoji} {post[field] || 0}
              </button>
            ))}
            <FaComment className="icon" />
            <FaShare onClick={() => alert("Shared!")} className="icon" />
            <FaWhatsapp
              onClick={() => handleWhatsAppShare(post.content)}
              className="icon whatsapp"
            />
          </div>

          {currentUser?.uid === post.user.uid && editingPostId !== post.id && (
            <div className="owner-controls">
              <button onClick={() => handleEditPost(post)} className="comment-button">Edit</button>
              <button onClick={() => handleDeletePost(post.id)} className="comment-button delete">Delete</button>
            </div>
          )}

          <CommentSection
            postId={post.id}
            comments={comments[post.id] || []}
            onSubmit={handleCommentSubmit}
          />
        </div>
      ))}
    </div>
  );
};

const CommentSection = ({ postId, comments, onSubmit }) => {
  const [text, setText] = useState("");

  return (
    <div className="comment-section">
      {comments.map((c, idx) => (
        <div key={idx} className="comment">
          <strong>{c.user}</strong>: {c.text}
          <div className="comment-time">
            {new Date(c.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="social-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit(postId, text);
            setText("");
          }
        }}
      />
      <button
        onClick={() => {
          onSubmit(postId, text);
          setText("");
        }}
        className="comment-button"
      >
        Post
      </button>
    </div>
  );
};

export default SocialMediaPage;