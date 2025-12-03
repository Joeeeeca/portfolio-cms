import { motion } from "framer-motion";

export default function GlassCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg transition"
    >
      {children}
    </motion.div>
  );
}
