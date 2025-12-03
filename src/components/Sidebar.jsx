  import pb from "../pocketbase";
import { Link, useNavigate } from "react-router-dom";
  import { FiHome, FiFileText, FiImage } from "react-icons/fi";
  import { motion } from "framer-motion";

  export default function Sidebar() {
      const navigate = useNavigate();

    function logout() {
      pb.authStore.clear();
      navigate("/login");
    }

    return (
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 p-6 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl min-h-screen flex flex-col"
      >
        <h1 className="text-3xl font-bold mb-10">My CMS</h1>

        <nav className="flex flex-col gap-4 text-lg">
          <Link 
            to="/" 
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >
            <FiHome size={20} />
            Dashboard
          </Link>

          <Link 
            to="/posts" 
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >
            <FiFileText size={20} />
            Posts
          </Link>

          <Link
    to="/new-post"
    className="text-gray-300 hover:text-white transition"
  >
    + New Post
  </Link>


          <Link 
            to="/media" 
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >
            <FiImage size={20} />
            Media
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white w-full text-left"
        >
          Logout
        </button>
      </motion.aside>
    );
  }
