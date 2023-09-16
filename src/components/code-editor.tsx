import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  onChange,
  initialValue
}) => {
  function handleEditorChange(value: string | undefined, event: any): void {
    if (value) {
      onChange(value);
    }
  }

  return (
    <MonacoEditor
      onChange={handleEditorChange}
      value={initialValue}
      theme="vs-dark"
      language="javascript"
      height="500px"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 18,
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  );
};

export default CodeEditor;
