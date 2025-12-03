import { useState } from "react";
import pb from "../pocketbase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e) {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      await pb.collection("users").requestPasswordReset(email);
      setStatus("If this email exists, a reset link has been sent.");
    } catch (err) {
      console.error(err);
      setStatus("Unable to send reset email.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Reset Password
        </h1>

        {status && (
          <p className="bg-blue-600/40 text-blue-100 p-3 rounded mb-4 text-center">
            {status}
          </p>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-black/20 border border-white/20 focus:border-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-medium"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <a
          href="/login"
          className="block text-center text-blue-300 mt-4 hover:text-blue-400"
        >
          Back to login
        </a>
      </div>
    </div>
  );
}
