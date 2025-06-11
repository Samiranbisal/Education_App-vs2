// src/App.jsx
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Courses from "./pages/Courses";
import Blog from './pages/Blog';
import Contact from "./pages/Contact";
import EventsPage from './pages/EventsPage';
import GroupHomeCall from "./pages/GroupHomeCall";
import GroupVideoCall from "./pages/GroupVideoCall";
import OnetoOneAndGroupChat from './components/OnetoOneAndGroupChat';
import HostHome from './components/HostHome';
import HostRoom from './components/HostRoom';
import HostJoin from './components/HostJoin';
import ChatPage from './pages/ChatPage';
import QuestionPage from './pages/QuestionPage';

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- ADD THIS

function LayoutWrapper({ children }) {
  const location = useLocation();

  const hideLayoutPaths = ["/login", "/logout", "/"];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideLayout && <Header />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  const [user, loading] = useAuthState(auth); // Optional global usage

  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* 🔐 Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/group-home-call"
            element={
              <ProtectedRoute>
                <GroupHomeCall />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question-page"
            element={
              <ProtectedRoute>
                <QuestionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host-streaming"
            element={
              <ProtectedRoute>
                <HostJoin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/live-streaming"
            element={
              <ProtectedRoute>
                <HostHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:roomId"
            element={
              <ProtectedRoute>
                <HostRoom />
              </ProtectedRoute>
            }
          />

          {/* Make these routes protected as well */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/one-to-one-chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* Public Route */}
          <Route path="/group-video-call/:roomId" element={<GroupVideoCall />} />

          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
