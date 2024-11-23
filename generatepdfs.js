// pages/api/generate-pdf.js

import { PDFDocument } from 'pdf-lib';

export default async function handler(req, res) {
  const { id } = req.query;

  // Fetch request data (for simplicity, using a mock store)
  let request = requests.find((req) => req.id.toString() === id);
  if (!request) {
    return res.status(404).send('Request not found');
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const { guestName, guestNationality, guestId, destinationFrom, destinationTo } = request;

  page.drawText(`Guest Name: ${guestName}`, { x: 50, y: 350 });
  page.drawText(`Guest Nationality: ${guestNationality}`, { x: 50, y: 320 });
  page.drawText(`Guest ID: ${guestId}`, { x: 50, y: 290 });
  page.drawText(`From: ${destinationFrom}`, { x: 50, y: 260 });
  page.drawText(`To: ${destinationTo}`, { x: 50, y: 230 });

  const pdfBytes = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(pdfBytes));
}
