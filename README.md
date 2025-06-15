## KDoodle Drawing Web App
KDoodle is a modern web-based drawing application that allows users to draw freehand, shapes, add text, erase, import images (from file or URL), and export their work as a high-resolution PDF. The app is designed for both mouse and touch input and features a clean, intuitive interface.

## Purpose
This project was built as part of assignment for Rocketium's Software Engineer Intern role. It showcases front-end development, canvas manipulation, tool state logic, image handling, and export functionality.

## Tech Stack
1 *HTML, **CSS, *JavaScript (Vanilla JS)
jsPDF for PDF export
2 Font Awesome for icons (loaded via CDN)
Tech Stack
3 *HTML, **CSS, *JavaScript (Vanilla JS)
jsPDF for PDF export

## Features
Freehand Drawing: Draw on the canvas using the pen tool with selectable colors.

Shape Drawing: Instantly add rectangles, circles, triangles, and lines from the shapes dropdown.

Text Tool: Click anywhere on the canvas to type text directly, with a blinking caret to indicate typing position.

Eraser: Erase parts of your drawing with a thick eraser brush.
Clear Canvas: Instantly clear the entire canvas, including all drawings and text.

Color Palette: Choose from a palette of colors for the pen tool.
Image Import:

From File: Click the image button to upload and place an image on the canvas. The image can be moved by canvas. The image can be moved by dragging.
From URL: Paste an image URL in the provided field and click the link icon to import. The image can be moved by dragging.

Export as PDF: Export your entire canvas as a high-resolution PDF (A4, 300dpi) with the export button in the top right corner.

Touch Support: Draw and erase using touch on supported devices.

## How to Use
Drawing:
Click the pen button to activate freehand drawing. Select a color from the palette below.
Use the eraser button to erase parts of your drawing.
Use the clear button to clear the entire canvas.

Shapes:
Click the shapes dropdown and select a shape to add it to the center of the canvas.
Shapes are drawn in the currently selected pen color.

Text:
Click the text button, then click anywhere on the canvas to start typing. A blinking caret will show where text will appear.
Press Enter to finish typing.

Importing Images:
Click the image button to upload an image from your device. The image will appear on the canvas and can be moved by dragging.

Paste an image URL in the field below the image button and click the link icon to import an image from the web. The image can also be moved by dragging.

Exporting:
Click the export button (top right) to download your canvas as a high-resolution PDF.

## Backend Setup for PDF Export
To enable high-resolution PDF export via the Node.js backend, follow these steps:

Install Node.js and npm
Download and install Node.js (which includes npm) from https://nodejs.org/.

Install backend dependencies

Start the backend server

You should see a message like:
Server is running on port 3000

Exporting as PDF
Use the "Export as PDF" button in the app. The client will send your canvas to the backend, which will generate and return a high-resolution PDF.

## File Structure
index.html — Main HTML file, contains the UI and canvas.
style.css — All styles for layout, buttons, dropdowns, and color palette.
canvas.js — Main JavaScript logic for drawing, shapes, text, erasing, image import, export, and tool state management.

## Dependencies
Font Awesome for icons (loaded via CDN)
jsPDF for PDF export (loaded via CDN)

## Notes
Only one tool (pen, eraser, or text) can be active at a time.
Color selection only works when the pen tool is active.
Imported images (from file or URL) are movable by dragging.
The app is responsive and works on both desktop and touch devices.

## License
This project is for educational/demo purposes.
