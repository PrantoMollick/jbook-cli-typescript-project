import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [err, setErr] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await Bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Resizable direction="y">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="x">
          <CodeEditor
            onChange={(value: string) => setInput(value)}
            initialValue="const a = 1;"
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
