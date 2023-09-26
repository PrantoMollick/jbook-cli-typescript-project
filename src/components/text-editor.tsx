import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import Markdown from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";

import "./text-editor.scss";

const TextEditor: React.FC = () => {
  const [value, setValue] = useState("# Hello word:");
  const [isEdit, setIsEdit] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        console.log("Element clicked on is inside editor");
        return;
      }
      console.log(event.target);

      setIsEdit(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (!isEdit) {
    return (
      <div onClick={() => setIsEdit(true)} className="card">
        <div className="card-content">
          <Markdown source={value} />
        </div>
      </div>
    );
  }

  return (
    <div ref={editorRef} className="text-editor">
      <MDEditor
        value={value}
        onChange={(v) => setValue(v || "")}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]]
        }}
      />
    </div>
  );
};

export default TextEditor;
