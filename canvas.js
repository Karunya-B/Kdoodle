const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
window.addEventListener('load', () => {
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener("mousedown",startpainting);
    canvas.addEventListener("mousemove", sketch);
    canvas.addEventListener("mouseup", stoppainting);
    canvas.addEventListener("mouseout",stoppainting,false);
})

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const options = dropdown.querySelector('.options');
    const optionsList = dropdown.querySelectorAll('.options li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        options.classList.toggle('options-open');
    });
    
    optionsList.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            options.classList.remove('options-open');
            optionsList.forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            if (option.innerText === 'Rectangle') {
                const rectWidth = 150;
                const rectHeight = 100;
                ctx.beginPath();
                ctx.strokeRect(centerX - rectWidth / 2, centerY - rectHeight / 2, rectWidth, rectHeight);
                ctx.strokeStyle = color;
                ctx.stroke();
            } else if (option.innerText === 'Circle') {
                ctx.beginPath();
                ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
                ctx.strokeStyle = color;
                ctx.stroke();
            } else if (option.innerText === 'Line') {
                ctx.beginPath();
                ctx.moveTo(centerX - 50, centerY);
                ctx.lineTo(centerX + 50, centerY);
                ctx.strokeStyle = color;
                ctx.lineWidth = 5;
                ctx.stroke();
            } else if (option.innerText === 'Triangle') {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY - 60);
                ctx.lineTo(centerX + 50, centerY + 40);
                ctx.lineTo(centerX - 50, centerY + 40);
                ctx.closePath();
                ctx.strokeStyle = color;
                ctx.stroke();
            }
            if (!penActive) return;
        });
    });
});


document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
            const select = dropdown.querySelector('.select');
            const caret = dropdown.querySelector('.caret');
            const options = dropdown.querySelector('.options');
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            options.classList.remove('options-open');
        });
    }
});
const penButton = document.querySelector('.pen');
const eraserButton = document.querySelector('.eraser');
const textButton = document.querySelector('.text-btn');

let penActive = false;
let eraserActive = false;
let textActive = false;


penButton.addEventListener('click', function() {
    this.classList.toggle('clicked');
    penActive = this.classList.contains('clicked');
    if (penActive) {
        eraserActive = false;
        textActive = false;
        eraserButton.classList.remove('clicked');
        textButton.classList.remove('clicked');
    }
});
eraserButton.addEventListener('click', function() {
    this.classList.toggle('clicked');
    eraserActive = this.classList.contains('clicked');
    if (eraserActive) {
        penActive = false;
        textActive = false;
        penButton.classList.remove('clicked');
        textButton.classList.remove('clicked');
 }
});
textButton.addEventListener('click', function() {
    this.classList.toggle('clicked');
    textActive = this.classList.contains('clicked');
    if (textActive) {
        penActive = false;
        eraserActive = false;
        penButton.classList.remove('clicked');
        eraserButton.classList.remove('clicked');
    }
});
document.querySelectorAll('.color').forEach(el => {
    el.addEventListener('click', function() {
        if (penActive) {
            color = this.style.backgroundColor;
            this.classList.add('color-blink');
            setTimeout(() => {
                this.classList.remove('color-blink');
            }, 200);
        }
    });
});



document.addEventListener('click', (e) => {
    if (!e.target.closest('.pen')) {
        penButton.classList.remove('clicked');
    }
    if (!e.target.closest('.eraser')) {
        eraserButton.classList.
        remove('clicked');
    }
    if (!e.target.closest('.clear')) {
        clearButton.classList.remove('clicked');
    }

});


let coord ={
    x:0,
    y:0,
};
let lineWidth = 5;
let color = 'black';
let paint = false;
const getPosition = (e) => {
    coord.x = e.clientX - canvas.offsetLeft;
    coord.y = e.clientY - canvas.offsetTop;
};

const startpainting = (e) => {
    paint = true;
    getPosition(e);
};

const stoppainting = () => {
    paint = false;
}

const sketch = (e) => {
    if (paint && (penActive||eraserActive)) {
        ctx.beginPath();
        ctx.lineWidth = eraserActive ?  30: lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = eraserActive ? '#fff' : color;

        const prevX = coord.x;
        const prevY = coord.y;
        getPosition(e);
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }
};
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (paint && (penActive || eraserActive)) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const prevX = coord.x;
        const prevY = coord.y;
        coord.x = touch.clientX - rect.left;
        coord.y = touch.clientY - rect.top;
        ctx.beginPath();
        ctx.lineWidth = eraserActive ? 30 : lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = eraserActive ? '#fff' : color;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }
});
canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    paint = false;
});
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (paint && (penActive || eraserActive)) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0]; 
        const prevX = coord.x;
        const prevY = coord.y;
        coord.x = touch.clientX - rect.left;
        coord.y = touch.clientY - rect.top;
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }
});

let typing = false;
let typedText = '';
let textX = 0, textY = 0;
let caretVisible = true;
let caretInterval = null;

function renderTextWithCaret() {
    ctx.clearRect(textX - 2, textY - 2, ctx.measureText(typedText + 'M').width + 6, 26);
    ctx.font = '20px Arial';
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    ctx.fillText(typedText, textX, textY);
    if (typing && textActive && caretVisible) {
        const caretX = textX + ctx.measureText(typedText).width;
        ctx.beginPath();
        ctx.moveTo(caretX, textY);
        ctx.lineTo(caretX, textY + 20);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function startCaretBlink() {
    if (caretInterval) clearInterval(caretInterval);
    caretVisible = true;
    caretInterval = setInterval(() => {
        caretVisible = !caretVisible;
        renderTextWithCaret();
    }, 500);
}

function stopCaretBlink() {
    if (caretInterval) clearInterval(caretInterval);
    caretInterval = null;
    caretVisible = false;
    renderTextWithCaret();
}

canvas.addEventListener('click', function(e) {
    if (textActive) {
        typing = true;
        typedText = '';
        const rect = canvas.getBoundingClientRect();
        textX = e.clientX - rect.left;
        textY = e.clientY - rect.top;
        renderTextWithCaret();
        startCaretBlink();
    }
});

document.addEventListener('keydown', function(e) {
    if (typing && textActive) {
        if (e.key === 'Enter') {
            typing = false;
            stopCaretBlink();
        } else if (e.key === 'Backspace') {
            typedText = typedText.slice(0, -1);
        } else if (e.key.length === 1) {
            typedText += e.key;
        } else {
            return;
        }
        renderTextWithCaret();
    }
});
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', function() {
    this.classList.toggle('clicked');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    typing = false;
    typedText = '';
    stopCaretBlink();
});

let importedImg = null;
let imgX = 50, imgY = 50;
let imgWidth = 200, imgHeight = 200; 
let draggingImg = false;
let dragOffsetX = 0, dragOffsetY = 0;


function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (importedImg) {
        ctx.drawImage(importedImg, imgX, imgY, imgWidth, imgHeight);
    }
    
}


const importImgBtn = document.getElementById('importImgBtn');
const imgUpload = document.getElementById('imgUpload');

importImgBtn.addEventListener('click', function() {
    imgUpload.click();
});

imgUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const img = new Image();
        img.onload = function() {
            importedImg = img;
            imgWidth = img.width > 200 ? 200 : img.width;
            imgHeight = img.height > 200 ? 200 : img.height;
            imgX = 50;
            imgY = 50;
            redrawCanvas();
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
});


canvas.addEventListener('mousedown', function(e) {
    if (importedImg) {
        const mouseX = e.clientX - canvas.offsetLeft;
        const mouseY = e.clientY - canvas.offsetTop;
        if (
            mouseX >= imgX && mouseX <= imgX + imgWidth &&
            mouseY >= imgY && mouseY <= imgY + imgHeight
        ) {
            draggingImg = true;
            dragOffsetX = mouseX - imgX;
            dragOffsetY = mouseY - imgY;
        }
    }
});

canvas.addEventListener('mousemove', function(e) {
    if (draggingImg) {
        const mouseX = e.clientX - canvas.offsetLeft;
        const mouseY = e.clientY - canvas.offsetTop;
        imgX = mouseX - dragOffsetX;
        imgY = mouseY - dragOffsetY;
        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', function() {
    draggingImg = false;
});

canvas.addEventListener('mouseout', function() {
    draggingImg = false;
});
document.getElementById('exportPdfBtn').addEventListener('click', function() {
    const width = canvas.width;
    const height = canvas.height;
    const imageData = canvas.toDataURL('image/png', 1.0);

    fetch('http://localhost:3000/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData, width, height })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'canvas-export.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(() => alert('Failed to export PDF'));
});
imgUrlBtn.addEventListener('click', function(e) {
    if (e.target === imgUrlInput) return;
    e.preventDefault();
    const url = imgUrlInput.value.trim();
    if (!url) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function() {
        importedImg = img;
        imgWidth = img.width > 200 ? 200 : img.width;
        imgHeight = img.height > 200 ? 200 : img.height;
        imgX = 50;
        imgY = 50;
        redrawCanvas();
    };
    img.onerror = function() {
        alert('Failed to load image. Check the URL or CORS policy.');
    };
    img.src = url;
});