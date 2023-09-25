import { useEffect, useState } from "react";
import "./resizable.scss";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  children: React.ReactNode;
  direction: "x" | "y";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;

    const listner = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        // if (window.innerWidth * 0.75 < width) {
        //   setWidth(window.innerWidth * 0.75);
        // }
      }, 100);
    };

    window.addEventListener("resize", listner);

    return () => {
      window.removeEventListener("resize", listner);
    };
  }, [width]);

  if (direction === "x") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: width,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ["s"]
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
