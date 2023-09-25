import "./preview.scss";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>source code</title>
</head>
<body>
  <div id='root'></div>

  <script>
    window.addEventListener('message', (e) => {
      try {
        eval(event.data);
      } catch (error) {
        const root = document.getElementById('root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
        console.error(error);
      }
    }, false);
  </script>
</body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    const timer = setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "#fff" }}
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
        title="preview"
      />
    </div>
  );
};

export default Preview;
