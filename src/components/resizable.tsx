import "./resizable.scss";
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  children: React.ReactNode;
  direction: "x" | "y";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
