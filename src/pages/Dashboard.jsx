import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiUpload, FiUserPlus } from "react-icons/fi";
import pb from "../pocketbase";

import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import QuickAction from "../components/QuickAction";

export default function Dashboard() {
  const [postCount, setPostCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [recentPosts, setRecentPosts] = useState([]);
  const [recentMedia, setRecentMedia] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        // Fetch Posts
        const posts = await pb.collection("posts").getFullList({
          sort: "-created",
        });
        setPostCount(posts.length);
        setRecentPosts(posts.slice(0, 5));

        // Fetch Media
        const media = await pb.collection("media").getFullList({
          sort: "-created",
        });
        setMediaCount(media.length);
        setRecentMedia(media.slice(0, 5));

        // Fetch Users
        const users = await pb.collection("users").getFullList();
        setUserCount(users.length);

      } catch (err) {
        console.error("Dashboard load error:", err);
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-semibold mb-10">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <GlassCard>
            <h2 className="text-xl font-semibold mb-2">Posts</h2>
            <p className="text-gray-300">
              {loading ? "Loading..." : `${postCount} total posts`}
            </p>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold mb-2">Media</h2>
            <p className="text-gray-300">
              {loading ? "Loading..." : `${mediaCount} files in library`}
            </p>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <p className="text-gray-300">
              {loading ? "Loading..." : `${userCount} registered users`}
            </p>
          </GlassCard>
        </div>

        {/* QUICK ACTIONS */}
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4 mb-10">
          <QuickAction icon={FiPlus} label="New Post" link="/new-post" />
          <QuickAction icon={FiUpload} label="Upload Media" link="/media" />
          <QuickAction icon={FiUserPlus} label="Add User" link="/add-user" />
        </div>

        {/* Lower grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Recent Posts */}
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
            {recentPosts.length === 0 ? (
              <p className="text-gray-400">No posts yet.</p>
            ) : (
              <ul className="space-y-3 text-gray-300">
                {recentPosts.map((p) => (
                  <li key={p.id}>
                    <strong>{p.title}</strong>
                    <br />
                    <span className="text-sm text-gray-400">
                      {new Date(p.created).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>

          {/* Recent Media */}
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">Latest Media</h2>

            {recentMedia.length === 0 ? (
              <p className="text-gray-400">No media uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {recentMedia.map((m) => (
                  <img
                    key={m.id}
                    src={pb.files.getUrl(m, m.file)}
                    alt=""
                    className="rounded-lg border border-white/10"
                  />
                ))}
              </div>
            )}
          </GlassCard>

          {/* Activity */}
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">System Activity</h2>

            <ul className="space-y-2 text-gray-300">
              <li>• CMS fully connected ✔</li>
              <li>• Live stats active ✔</li>
              <li>• Portfolio synced to PocketBase ✔</li>
              <li>• SMTP enabled ✔</li>
              <li>• You're basically a full-stack dev now 😎🔥</li>
            </ul>
          </GlassCard>
        </div>
      </motion.div>
    </Layout>
  );
}
