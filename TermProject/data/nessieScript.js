// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const nessieImage = new Image();
nessieImage.src = 'media/nessie.png';
console.log('Nessie image path:', nessieImage.src); // Log Nessie image path

const seaweedImage = new Image();
seaweedImage.src = 'media/seaweed.png';
console.log('Seaweed image path:', seaweedImage.src); // Log Seaweed image path

const coinImage = new Image();
coinImage.src = 'media/pileCoins.png';
console.log('Coin image path:', coinImage.src); // Log Coin image path

// Define Nessie object
const nessie = {
    x: 100,
    y: canvas.height / 2,
    z: 0,
    width: 100, // Scaled width of Nessie image
    height: 100, // Scaled height of Nessie image
    depth: 97.65625, // Depth remains unchanged
    velocityX: 0,
    velocityY: 0,
    velocityZ: 0,
    speed: 5 // Adjust speed as needed
};

// Define seaweed width and height based on Nessie's size
const seaweedWidth = nessie.width / 2;
const seaweedHeight = nessie.height / 2;

// Define seaweed obstacles
let seaweeds = [];
const seaweedSpeed = 5;
const seaweedGap = 200;
const seaweedMinHeight = 50;
const seaweedMaxHeight = canvas.height - seaweedGap - seaweedMinHeight;
let seaweedTimer = 0;
const seaweedInterval = 80; // Interval to generate seaweed obstacles

// Define coin object
const coin = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    collected: false
};

// Variable to track game over state
let isGameOver = false;

// Variable to track score
let score = 0; // Add score variable and initialize it to 0

// Function to generate coins
function generateCoin() {
    coin.x = canvas.width + Math.random() * 500; // Random x position within canvas width + 500 (offscreen)
    coin.y = Math.random() * (canvas.height - 100) + 50; // Random y position within canvas height
    coin.collected = false;
}

// Function to move seaweed obstacles
function moveSeaweeds() {
    for (let i = 0; i < seaweeds.length; i++) {
        seaweeds[i].x -= seaweedSpeed;
        if (seaweeds[i].x + seaweeds[i].width < 0) {
            seaweeds.splice(i, 1);
            i--;
        }
    }
}

// Function to check for collisions with seaweed
function checkCollisions() {
    for (let i = 0; i < seaweeds.length; i++) {
        const seaweed = seaweeds[i];
        // Use scaled dimensions for collision detection
        if (nessie.x + nessie.width > seaweed.x &&
            nessie.x < seaweed.x + seaweed.width &&
            nessie.y + nessie.height > seaweed.y &&
            nessie.y < seaweed.y + seaweed.height) {
            gameOver();
        }
    }
}

// Function to check for collision with coin
function checkCoinCollision() {
    if (!coin.collected &&
        nessie.x + nessie.width > coin.x &&
        nessie.x < coin.x + coin.width &&
        nessie.y + nessie.height > coin.y &&
        nessie.y < coin.y + coin.height) {
        coin.collected = true;
        score += 100; // Increase score when coin is collected
        generateCoin(); // Generate new coin
    }
}

// Function to update game state
function update() {
    if (!isGameOver) {
        // Update Nessie's position
        nessie.x += nessie.velocityX;
        nessie.y += nessie.velocityY;
        nessie.z += nessie.velocityZ;

        // Keep Nessie within the canvas boundaries
        nessie.x = Math.max(0, Math.min(canvas.width - nessie.width, nessie.x));
        nessie.y = Math.max(0, Math.min(canvas.height - nessie.height, nessie.y));
        nessie.z = Math.max(0, Math.min(canvas.height - nessie.depth, nessie.z));

        // Move seaweed obstacles
        moveSeaweeds();

        // Generate new seaweed obstacles at regular intervals
        seaweedTimer++;
        if (seaweedTimer % seaweedInterval === 0) {
            generateSeaweed();
            seaweedTimer = 0;
        }

        // Check for collisions
        checkCollisions();

        // Check for collision with coin
        checkCoinCollision();

        // Update score continuously
        // Score already incremented when collecting coins
    }
}

// Function to draw everything on the canvas
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw seaweed obstacles
    seaweeds.forEach(seaweed => {
        ctx.drawImage(seaweedImage, seaweed.x, seaweed.y, seaweed.width, seaweed.height);
    });

    // Draw Nessie
    ctx.drawImage(nessieImage, nessie.x, nessie.y, nessie.width, nessie.height);

    // Draw coin if not collected
    if (!coin.collected) {
        ctx.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);
    }

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    // Draw game over message if game over
    if (isGameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('YOU DIED!', canvas.width / 2 - 100, canvas.height / 2);
        ctx.fillText('Press Space to Restart', canvas.width / 2 - 170, canvas.height / 2 + 40);
    }
}

// Function to handle game over
function gameOver() {
    isGameOver = true;
    // Add any additional logic you need for game over
}

// Function to reset the game
function resetGame() {
    isGameOver = false;
    nessie.x = 100;
    nessie.y = canvas.height / 2;
    nessie.z = 0;
    score = 0;
    seaweeds = [];
}

// Call generateCoin function to initialize the first coin
generateCoin();

// Game loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Start the game loop
loop();
