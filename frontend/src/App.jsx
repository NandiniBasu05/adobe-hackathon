import { useEffect } from "react";
import Sidebar from "./Sidebar";
import PdfViewer from "./PdfViewer";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content: PDF Viewer */}
      <div style={{ flex: 1, padding: "1rem" }}>
        <PdfViewer />
      </div>
    </div>
  );
}

export default App;


