import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pb from "../pocketbase";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import RichTextEditor from "../components/RichTextEditor";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [newImage, setNewImage] = useState(null);

  // Load post once
  useEffect(() => {
    pb.autoCancellation(false);

    pb.collection("posts")
      .getOne(id)
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags || "");
        setLoading(false);
      })
      .catch(() => {
        alert("Post not found.");
        navigate("/posts");
      });
  }, [id, navigate]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);

    if (newImage) {
      formData.append("coverImage", newImage);
    }

    try {
      await pb.collection("posts").update(id, formData);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      alert("Error saving post.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-gray-300">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8">Edit Post</h1>

        <GlassCard>
          <form onSubmit={handleSave} className="flex flex-col gap-6">

            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
           {/* Content */}
<div>
  <label className="block mb-1 font-medium">Content</label>
  <RichTextEditor value={content} onChange={setContent} />
</div>


            {/* Tags */}
            <div>
              <label className="block mb-1 font-medium">Tags</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Existing Preview */}
            {post.coverImage && (
              <div className="mb-3">
                <p className="text-sm text-gray-300 mb-1">Current Cover:</p>
                <img
                  className="w-48 rounded-lg border border-white/20"
                  src={`http://127.0.0.1:8090/api/files/posts/${post.id}/${post.coverImage}`}
                />
              </div>
            )}

            {/* New Cover Image */}
            <div>
              <label className="block mb-1 font-medium">Replace Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </form>
        </GlassCard>
      </div>
    </Layout>
  );
}
