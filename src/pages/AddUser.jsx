import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pocketbase";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";

export default function AddUser() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Create user in PocketBase
      await pb.collection("users").create({
        email,
        password,
        passwordConfirm,
      });

      setSuccess("User created successfully!");
      setTimeout(() => navigate("/"), 1200);

    } catch (err) {
      console.error(err);
      setError("Failed to create user.");
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8">Add New User</h1>

        <GlassCard>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {error && (
              <p className="bg-red-600/40 text-red-200 p-3 rounded">
                {error}
              </p>
            )}

            {success && (
              <p className="bg-green-600/40 text-green-200 p-3 rounded">
                {success}
              </p>
            )}

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Creating..." : "Create User"}
            </button>

          </form>
        </GlassCard>
      </div>
    </Layout>
  );
}
