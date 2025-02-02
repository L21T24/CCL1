// Import required game objects
import { Alge } from "../gameObjects/alge.js";
import { Mermaid } from "../gameObjects/mermaid.js";
import { Shell } from "../gameObjects/shell.js";
import { global } from "./global.js";

// Get canvas element and context
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

// Image assets
let algeImageTop;
let algeImageBottom;
let mermaidImage;
let shellImage;

// Game intervals
let shellInterval;
let algeInterval;

// Shell counter
let shellCount;

// Game state
let isGameOver = false;

// Function to initialize and set up the game
function setupGame() {
    // Initialize shell counter
    shellCount = 0;

    // Load image assets
    algeImageTop = new Image();
    algeImageTop.src = "./Images/AlgeaDown.png";

    algeImageBottom = new Image();
    algeImageBottom.src = "./Images/Algeaup.png";

    mermaidImage = new Image();
    mermaidImage.src = "./Images/aMermaid.png";

    shellImage = new Image();
    shellImage.src = "./Images/Shell.png";

    // Initialize mermaid character once the image is loaded
    mermaidImage.onload = () => {
        global.mermaid = new Mermaid(mermaidImage, 100, canvas.height / 2 - 32, 64, 32);
        global.objects.push(global.mermaid);
    };

    // Periodically add algae obstacles
    algeInterval = setInterval(() => {
        const randomY = Math.random() * (canvas.height - 300) + 50; // Ensure spacing
        const algeTop = new Alge(algeImageTop, canvas.width, 0, 32, randomY);
        const algeBottom = new Alge(algeImageBottom, canvas.width, randomY + 150, 32, canvas.height - randomY - 150);
        global.objects.push(algeTop, algeBottom);
    }, 2000);

    // Periodically add shells
    shellInterval = setInterval(() => {
        const algae = global.objects.filter(obj => obj instanceof Alge);

        if (algae.length >= 2) {
            // Get bounds of the first pair of algae
            const topAlge = algae[0];
            const bottomAlge = algae[1];
            const topAlgeBounds = topAlge.getBounds();
            const bottomAlgeBounds = bottomAlge.getBounds();

            // Calculate the gap between algae
            const gapStart = topAlgeBounds.bottom;
            const gapEnd = bottomAlgeBounds.top;

            // Ensure the gap is large enough for a shell to fit
            if (gapEnd - gapStart > 32) {
                const shellY = Math.random() * (gapEnd - gapStart - 32) + gapStart; // Random Y in the gap
                const shell = new Shell(shellImage, canvas.width, shellY, 32, 32);
                global.objects.push(shell);
            } else {
                console.warn("No valid gap for shell spawning.");
            }
        } else {
            // Default behavior if no algae pairs exist
            const shellY = Math.random() * (canvas.height - 32);
            const shell = new Shell(shellImage, canvas.width, shellY, 32, 32);
            global.objects.push(shell);
        }
    }, 3000);
}

// Function to update shell count when collected
function collectShell() {
    shellCount++;
    document.getElementById("shellCounter").textContent = shellCount;
}

// Handle collision with objects
function handleCollision(obj) {
    if (obj instanceof Alge) {
        console.log("Collision with Alge!");
        gameOver(); // End the game on collision with algae
    } else if (obj instanceof Shell) {
        collectShell(); // Increase shell counter
        console.log("Collision with Shell!");
        obj.remove(); // Remove shell after collection
    }
}

// Function to reset the game
function resetGame() {
    isGameOver = false;
    global.objects = [];
    global.shellCount = 0;
    document.getElementById("shellCounter").textContent = "0";
    console.log("Game reset.");
    clearInterval(algeInterval);
    clearInterval(shellInterval);
    setupGame();
}

// Start game when start button is clicked

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('starScreen').style.display = "none";
    document.getElementById('gamee').style.display = "block";
    resetGame();
});

// Return to menu when menu button is clicked
document.getElementById("menu").addEventListener("click", () => {
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("starScreen").style.display = "block";
});

// Function to handle game over state
function gameOver() {
    if (isGameOver) {
        return;
    }
    isGameOver = true;

    // Stop game updates
    clearInterval(global.gameInterval);
    cancelAnimationFrame(global.animationFrame);

    // Display game over screen
    document.getElementById("gamee").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
    
    // Display final score
    document.getElementById("finalScore").textContent = shellCount || 0;

    console.log("Game Over!");
}

// Main game loop to update game state
function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
    global.deltaTime /= 1000; // Convert milliseconds to seconds
    global.prevTotalRunningTime = totalRunningTime;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw game objects
    global.objects = global.objects.filter(obj => obj.active); // Remove inactive objects
    global.objects.forEach(obj => {
        obj.update();
        if ((obj instanceof Alge || obj instanceof Shell) && !obj.collided) {
            if (global.mermaid.checkCollision(obj)) {
                obj.collided = true;
                handleCollision(obj);
            }
        }
        if (obj instanceof Shell) {
            global.objects.forEach(obj2 => {
                if (obj2 instanceof Alge && obj2.checkCollision(obj)) {
                    obj.remove(); 
                }
            });
        }
        obj.draw(context); 
    });

    // Check if mermaid hits top or bottom of canvas
    if (global.mermaid !== null && (global.mermaid.y + 10 > canvas.height || global.mermaid.y < 0)) {
        gameOver();
    }

    // Request next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
