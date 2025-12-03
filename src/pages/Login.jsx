import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pocketbase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await pb.collection("users").authWithPassword(email, password);

      // Success → redirect to dashboard
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Login to CMS
        </h1>

        {error && (
          <p className="bg-red-600/40 text-red-200 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-black/20 border border-white/20 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-black/20 border border-white/20 focus:outline-none focus:border-blue-400"
            />
            <a
  href="/forgot-password"
  className="block text-blue-300 text-sm mt-2 hover:text-blue-400"
>
  Forgot password?
</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-medium transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
