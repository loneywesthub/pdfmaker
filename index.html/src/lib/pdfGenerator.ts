import { jsPDF } from 'jspdf';

export async function generatePDF(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();
      
      // Set font
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      
      // Add title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Document", 20, 20);
      
      // Add content
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      
      // Split text into lines that fit the page width
      const lines = doc.splitTextToSize(text, 170);
      
      let yPosition = 40;
      const pageHeight = 280;
      const lineHeight = 7;
      
      for (let i = 0; i < lines.length; i++) {
        // Check if we need a new page
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.text(lines[i], 20, yPosition);
        yPosition += lineHeight;
      }
      
      // Save the PDF
      doc.save('document.pdf');
      
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
