import "./code-editor.scss";
import { useRef, useEffect } from "react";

import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import monaco from "monaco-editor";
import codeShift from "jscodeshift";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  onChange,
  initialValue
}) => {
  const editorRef = useRef<any>();

  useEffect(() => {
    const timmer = setTimeout(() => {
      const monacoJsxHighlighter = new MonacoJSXHighlighter(
        // @ts-ignore
        window.monaco, // The global window object (or other suitable context)
        // codeShift,
        MonacoEditor, // Your Monaco Editor instance
        editorRef.current
      );
      // monacoJsxHighlighter.registerLanguage();

      monacoJsxHighlighter.highLightOnDidChangeModelContent(
        () => {},
        () => {},
        undefined,
        () => {}
      );
    }, 2000);

    return clearTimeout(timmer);
  }, [editorRef]);

  const handleEditorChange: OnChange = function (value, ev) {
    value && onChange(value);
  };

  const handleEditorDidMount: OnMount = function (editor, monaco) {
    editor.getModel()?.updateOptions({ tabSize: 2 });
    editorRef.current = editor;
  };

  const handleFormatClick = function () {
    console.log(editorRef.current.getValue());
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        value={initialValue}
        theme="vs-dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          autoIndent: "full",
          contextmenu: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
