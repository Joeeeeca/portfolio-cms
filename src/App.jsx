import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Media from "./pages/Media";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import RequireAuth from "./components/RequireAuth";
import ForgotPassword from "./pages/ForgotPassword";
import AddUser from "./pages/AddUser";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/posts" element={<RequireAuth><Posts /></RequireAuth>} />
        <Route path="/new-post" element={<RequireAuth><NewPost /></RequireAuth>} />
        <Route path="/edit-post/:id" element={<RequireAuth><EditPost /></RequireAuth>} />
        <Route path="/media" element={<RequireAuth><Media /></RequireAuth>} />
        <Route path="/add-user" element={<RequireAuth><AddUser /></RequireAuth>} />
      </Routes>
    </Router>
  );
}
