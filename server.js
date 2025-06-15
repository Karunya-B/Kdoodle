// server.js
// Node.js Express server for exporting canvas as high-res PDF

const express = require('express');
const { PDFDocument } = require('pdf-lib');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from your frontend
app.use(bodyParser.json({ limit: '20mb' }));

app.post('/export-pdf', async (req, res) => {
    try {
        const { imageData, width, height } = req.body;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([width, height]);
        const pngImage = await pdfDoc.embedPng(imageData);
        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: width,
            height: height,
        });
        const pdfBytes = await pdfDoc.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="canvas-export.pdf"');
        res.send(Buffer.from(pdfBytes));
    } catch (err) {
        res.status(500).send('Failed to generate PDF');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
