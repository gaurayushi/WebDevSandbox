/// Elements
const imageInput = document.getElementById('imageInput');
const memeCanvas = document.getElementById('memeCanvas');
const addTextButton = document.getElementById('addText');
const downloadButton = document.getElementById('downloadMeme');
const fontSizeDisplay = document.getElementById('fontSizeDisplay');
const increaseFontButton = document.getElementById('increaseFont');
const decreaseFontButton = document.getElementById('decreaseFont');
const fontStyleSelect = document.getElementById('fontStyle');
const textColorPicker = document.getElementById('textColor');
const textOverlayContainer = document.getElementById('textOverlayContainer');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');

const ctx = memeCanvas.getContext('2d');
let img = new Image();
let currentFontSize = 20;
let currentFontStyle = 'Arial';
let currentTextColor = '#000000';

// History and Redo Stacks
let historyStack = [];
let redoStack = [];

// Command structure for the command pattern
class Command {
    constructor(execute, undo, element = null) {
        this.execute = execute;
        this.undo = undo;
        this.element = element;  // Track element being manipulated
    }
}

// Add a text box command
function addTextCommand() {
    const textBox = document.createElement('div');
    textBox.classList.add('text-box');
    textBox.contentEditable = true;
    textBox.style.fontSize = `${currentFontSize}px`;
    textBox.style.fontFamily = currentFontStyle;
    textBox.style.color = currentTextColor;
    textBox.textContent = 'Edit Me!';
    textBox.style.left = '50px';
    textBox.style.top = '50px';

    // Drag logic
    textBox.addEventListener('mousedown', dragStart);

    // Add right-click to delete the text box
    textBox.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        deleteTextCommand(textBox);
    });

    textOverlayContainer.appendChild(textBox);

    // Save state for undo
    const addCommand = new Command(
        () => textOverlayContainer.appendChild(textBox),
        () => textBox.remove(),
        textBox
    );
    executeCommand(addCommand);
}

// Delete a text box command
function deleteTextCommand(textBox) {
    const deleteCommand = new Command(
        () => textBox.remove(),
        () => textOverlayContainer.appendChild(textBox),
        textBox
    );
    executeCommand(deleteCommand);
}

// Move text box command
function moveTextCommand(textBox, oldPosition, newPosition) {
    const moveCommand = new Command(
        () => {
            textBox.style.left = newPosition.left;
            textBox.style.top = newPosition.top;
        },
        () => {
            textBox.style.left = oldPosition.left;
            textBox.style.top = oldPosition.top;
        }
    );
    executeCommand(moveCommand);
}

// Function to execute a command and save to history
function executeCommand(command) {
    command.execute();
    historyStack.push(command);
    redoStack = [];  // Clear redo stack after new command
}

// Undo Functionality
undoButton.addEventListener('click', () => {
    if (historyStack.length > 0) {
        const command = historyStack.pop();
        command.undo();
        redoStack.push(command);
    }
});

// Redo Functionality
redoButton.addEventListener('click', () => {
    if (redoStack.length > 0) {
        const command = redoStack.pop();
        command.execute();
        historyStack.push(command);
    }
});

// Dragging Logic
let draggedElement = null;
let dragStartPos = {};

function dragStart(e) {
    draggedElement = e.target;
    dragStartPos = { left: draggedElement.style.left, top: draggedElement.style.top };

    let offsetX = e.clientX - draggedElement.getBoundingClientRect().left;
    let offsetY = e.clientY - draggedElement.getBoundingClientRect().top;

    function dragMove(ev) {
        draggedElement.style.left = `${ev.clientX - offsetX}px`;
        draggedElement.style.top = `${ev.clientY - offsetY}px`;
    }

    function dragEnd() {
        const newPos = { left: draggedElement.style.left, top: draggedElement.style.top };
        moveTextCommand(draggedElement, dragStartPos, newPos);
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
    }

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

// Load Image onto Canvas
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        img.src = event.target.result;
        img.onload = () => {
            memeCanvas.width = img.width;
            memeCanvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    };

    reader.readAsDataURL(file);
});

// Add text button event listener
addTextButton.addEventListener('click', addTextCommand);

downloadButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
    ctx.drawImage(img, 0, 0);

    
    const textBoxes = document.querySelectorAll('.text-box');
    textBoxes.forEach(textBox => {
        const fontSize = window.getComputedStyle(textBox).fontSize;
        const fontFamily = window.getComputedStyle(textBox).fontFamily;
        const color = window.getComputedStyle(textBox).color;
        const x = parseInt(textBox.style.left);
        const y = parseInt(textBox.style.top) + parseInt(fontSize);

        ctx.font = `${fontSize} ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.fillText(textBox.textContent, x, y);
    });

    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = memeCanvas.toDataURL();
    link.click();
});
