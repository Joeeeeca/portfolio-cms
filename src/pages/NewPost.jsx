import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pocketbase";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import RichTextEditor from "../components/RichTextEditor";

// Utility: convert title → slug
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewPost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");        // 🔥 new field
  const [content, setContent] = useState("");  // HTML from editor
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // If slug empty → auto-generate from title
    const finalSlug = slug.trim() !== "" ? slugify(slug) : slugify(title);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", finalSlug);      // 🔥 required for blog URLs
    formData.append("content", content);     // HTML
    formData.append("tags", tags);
    formData.append("author", ""); 

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await pb.collection("posts").create(formData);
      navigate("/posts");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create post.");
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8">Create New Post</h1>

        <GlassCard>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block mb-1 font-medium">
                Slug (URL — optional, auto-generates if blank)
              </label>
              <input
                type="text"
                placeholder="e.g. seo-basics-for-small-businesses"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-1 font-medium">Content</label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-1 font-medium">Tags (comma separated)</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block mb-1 font-medium">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </GlassCard>
      </div>
    </Layout>
  );
}
