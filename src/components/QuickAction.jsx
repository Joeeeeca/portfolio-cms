import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function QuickAction({ icon: Icon, label, link }) {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => link && navigate(link)}
      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-xl text-white shadow-lg transition"
    >
      {Icon && <Icon size={20} />}
      {label}
    </motion.button>
  );
}
