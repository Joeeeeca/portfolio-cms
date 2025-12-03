import { useEffect, useState } from "react";
import pb from "../pocketbase";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    pb.collection("posts")
      .getList(1, 50, { expand: "author" })
      .then((res) => {
        setPosts(res.items);
        console.log("Posts:", res.items);
      });
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this post permanently?");
    if (!confirmDelete) return;

    try {
      await pb.collection("posts").delete(id);

      // animate removal
      setPosts((prev) => prev.filter((p) => p.id !== id));

    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete post.");
    }
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold mb-10">Posts</h1>

        {posts.length === 0 ? (
          <p className="text-gray-400">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}        // fade-out animation
                  transition={{ duration: 0.25 }}
                >
                  <GlassCard>
                    <div className="flex gap-4">

                      {/* Cover Image */}
                      {post.coverImage ? (
                        <img
                          src={`http://127.0.0.1:8090/api/files/posts/${post.id}/${post.coverImage}`}
                          alt={post.title}
                          className="w-40 h-28 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-40 h-28 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                          No image
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {post.content}
                        </p>

                        <div className="text-xs text-gray-500 mt-2">
                          Author: {post.expand?.author?.email || "Unknown"}
                        </div>
                      </div>

                      <Link
  to={`/edit-post/${post.id}`}
  onClick={() => console.log("Editing ID:", post.id)}   // ← ADD THIS
  className="text-blue-400 hover:text-blue-500 transition mr-3"
>
  <FiEdit size={22} />
</Link>


                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="ml-auto text-red-400 hover:text-red-600 transition"
                      >
                        <FiTrash2 size={22} />
                      </button>

                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>

          </div>
        )}
      </div>
    </Layout>
  );
}
