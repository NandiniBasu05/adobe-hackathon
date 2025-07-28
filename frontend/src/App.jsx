import { useEffect } from "react";

function PdfViewer() {
  useEffect(() => {
    const showPDF = () => {
      const adobeDCView = new window.AdobeDC.View({
  clientId: "1a9c1a8cdb2d4a00ac3c3bb0da2d523a", // your actual API key
  divId: "adobe-dc-view"
});


      adobeDCView.previewFile({
        content: {
          location: {
            url: "sample.pdf",
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

  return <div id="adobe-dc-view" style={{ height: "100vh" }} />;
}

export default PdfViewer;
