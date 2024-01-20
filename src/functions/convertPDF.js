import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

async function convertPDF(fileSource) {
  try {
    let pdf;
    if (fileSource instanceof ArrayBuffer) {
      // Handling ArrayBuffer input
      pdf = await pdfjs.getDocument({ data: fileSource }).promise;
    } else if (typeof fileSource === "string") {
      // Handling URL input
      pdf = await pdfjs.getDocument(fileSource).promise;
    } else {
      throw new Error("Invalid input type for PDF");
    }

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      let page = await pdf.getPage(i);
      let pageTextContent = await page.getTextContent();
      text += pageTextContent.items.map((item) => item.str).join(" ");
    }
    return text;
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw error;
  }
}

export default convertPDF;
