import { useEffect } from "react";

function PdfViewer() {
  useEffect(() => {
    const showPDF = () => {
      const adobeDCView = new window.AdobeDC.View({
        clientId: "64d3bcff446644588ff23586d50092b7", // ✅ Replace with your real Client ID
        divId: "pdf-viewer"
      });

      adobeDCView.previewFile({
        content: {
          location: {
            url: "/sample.pdf" // ✅ Must match the file you placed in public/
          }
        },
        metaData: { fileName: "sample.pdf" }
      }, {
        embedMode: "FULL_WINDOW"
      });
    };

    if (window.AdobeDC) {
      showPDF();
    } else {
      document.addEventListener("adobe_dc_view_sdk.ready", showPDF);
    }
  }, []);

  return (
    <div id="pdf-viewer" style={{ height: "100vh", width: "100%" }}></div>
  );
}

export default PdfViewer;
