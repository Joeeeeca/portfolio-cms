import { useEffect, useState } from "react";
import pb from "../pocketbase";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiCopy, FiUpload } from "react-icons/fi";

export default function Media() {
  const [items, setItems] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Load existing media
  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    const res = await pb.collection("media").getList(1, 200);
    setItems(res.items);
  }

  // Upload
async function handleUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return alert("No file selected");

  try {
    const record = await pb.collection("media").create({
      file,
      alt: file.name,
    });

    console.log("Uploaded:", record);
    loadMedia();
  } catch (err) {
    console.error("UPLOAD FAILED (FULL ERROR):", err);
    console.log("RAW PB ERROR:", err.data);        // <= Important
    console.log("MESSAGE:", err.message);          // <= Important
    console.log("STATUS:", err.status);            // <= Important
    alert("Upload failed.");
  }
}




  // Copy URL
  function copyUrl(item) {
    const url = pb.files.getUrl(item, item.file);
    navigator.clipboard.writeText(url);
    alert("Copied URL:\n" + url);
  }

  // Delete media
  async function handleDelete(id) {
    if (!confirm("Delete this image permanently?")) return;

    await pb.collection("media").delete(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-4xl font-semibold">Media Library</h1>

          <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2">
            <FiUpload /> Upload
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>

        {uploading && (
          <p className="text-gray-400 mb-4">Uploading...</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/10 p-2 rounded-lg relative group"
              >
                <img
                  src={pb.files.getUrl(item, item.file)}
                  alt={item.alt}
                  className="w-full h-40 object-cover rounded-md"
                />

                {/* Buttons */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => copyUrl(item)}
                    className="bg-black/60 p-1 rounded"
                  >
                    <FiCopy size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 p-1 rounded"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length === 0 && (
          <p className="text-gray-400 mt-10 text-center">
            No media uploaded yet.
          </p>
        )}
      </div>
    </Layout>
  );
}
