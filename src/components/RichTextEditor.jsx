import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none p-4 bg-black/20 border border-white/10 rounded-lg min-h-[300px] focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex gap-2 mb-3 flex-wrap bg-white/10 p-3 rounded-lg border border-white/20">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="editor-btn">
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="editor-btn">
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className="editor-btn">
          Strike
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()} className="editor-btn">
          Paragraph
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="editor-btn">
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="editor-btn">
          H3
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="editor-btn">
          • List
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="editor-btn">
          1. List
        </button>

        <button
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="editor-btn"
        >
          Link
        </button>

        <button
          onClick={() => {
            const url = prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="editor-btn"
        >
          Image
        </button>
      </div>

      {/* Content area */}
      <EditorContent editor={editor} />
    </div>
  );
}
