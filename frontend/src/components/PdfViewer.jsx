import { useEffect } from "react";

function PdfViewer() {
  useEffect(() => {
    const showPDF = () => {
      const adobeDCView = new window.AdobeDC.View({
        clientId: "64d3bcff446644588ff23586d50092b7", // ✅ Your actual Adobe Embed API key
        divId: "adobe-dc-view" // ✅ Must match the div ID in the return statement
      });

      adobeDCView.previewFile({
        content: {
          location: {
            url: "/sample.pdf" // ✅ Make sure this file exists in your public/ directory
          }
        },
        metaData: {
          fileName: "sample.pdf"
        }
      }, {
        embedMode: "FULL_WINDOW" // You can change to SIZED_CONTAINER if needed
      });
    };

    // Adobe viewer SDK ready check
    if (window.AdobeDC) {
      showPDF();
    } else {
      document.addEventListener("adobe_dc_view_sdk.ready", showPDF);
    }
  }, []);

  return (
    // ✅ This div ID must match what you gave in adobeDCView config
    <div id="adobe-dc-view" style={{ height: "100vh", width: "100%" }}></div>
  );
}

export default PdfViewer;
