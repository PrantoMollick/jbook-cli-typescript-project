import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [input, setInput] = useState("");

  const handleClick = async () => {
    const output = await Bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="y">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <CodeEditor
          onChange={(value: string) => setInput(value)}
          initialValue="const a = 1;"
        />
        {/* <div>
          <button onClick={handleClick}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
