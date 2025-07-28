import { useEffect } from "react";

function PdfViewer() {
  useEffect(() => {
    const showPDF = () => {
      const adobeDCView = new window.AdobeDC.View({
  clientId: "307026f3ab904fbaa9716e6b64f85216", // your actual API key
  divId: "adobe-dc-view"
});


      adobeDCView.previewFile({
        content: {
          location: {
            url: "https://euphonious-sprinkles-065543.netlify.app/sample.pdf",
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

  return <div id="pdf-viewer" style={{ height: "100vh" }} />;
}

export default PdfViewer;
