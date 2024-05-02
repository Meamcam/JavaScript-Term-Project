// Array of riddles
const puzzles = [
    {
        question: "I am known as the 'Abominable Snowman'. What is my other name?",
        answer: "Yeti",
        hint: "I am said to inhabit the Himalayas."
    },
    {
        question: "Which lake is famous for its alleged monster?",
        answer: "Loch Ness",
        hint: "It is located in Scotland."
    },
    {
        question: "What mythical creature is said to resemble a large ape or bear?",
        answer: "Bigfoot",
        hint: "I am often reported to be sighted in forests of North America."
    },
    {
        question: "What creature is believed to suck the blood of livestock?",
        answer: "Chupacabra",
        hint: "I am said to originate from Latin American folklore."
    },
    {
        question: "What legendary creature is known for its large wings and glowing red eyes?",
        answer: "Mothman",
        hint: "I am associated with sightings in the Point Pleasant area of West Virginia."
    },
    {
        question: "What creature from North American folklore has the head of a horse and wings of a bat?",
        answer: "Jersey Devil",
        hint: "I am said to haunt the Pine Barrens of New Jersey."
    },
    {
        question: "What mythical creature is said to inhabit the forests of Indonesia?",
        answer: "Orang Pendek",
        hint: "I am described as a short, bipedal hominid."
    },
    {
        question: "What legendary sea monster is said to dwell off the coast of Greenland and Norway?",
        answer: "Kraken",
        hint: "I am often depicted as a giant squid or octopus."
    },
    {
        question: "What mythical creature is a part of Native American folklore and is described as a large serpent-like being?",
        answer: "Thunderbird",
        hint: "I am said to be associated with storms and thunder."
    },
    {
        question: "What legendary creature from Scottish folklore is said to inhabit the lochs of Scotland?",
        answer: "Kelpie",
        hint: "I am often depicted as a horse."
    },
    {
        question: "What mythical creature is said to resemble a giant bat and is often associated with vampire lore?",
        answer: "Vampire",
        hint: "I am said to drink the blood of the living to survive."
    },
    {
        question: "What legendary creature is described as a large, reptilian monster and is often associated with the swamps of the southern United States?",
        answer: "Lizard Man",
        hint: "I am said to have been sighted in South Carolina."
    }
];


// Function to shuffle the puzzles array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle the puzzles array
shuffle(puzzles);

// Initialize variables
let currentLevel = 0;
let score = 0;
let strikeCount = 0;
let startTime = new Date().getTime();

// Function to display the current puzzle
function displayPuzzle() {
    const puzzleContainer = document.getElementById('puzzle');
    const currentPuzzle = puzzles[currentLevel];
    puzzleContainer.innerHTML = `
        <p>${currentPuzzle.question}</p>
        <input type="text" id="answerInput" placeholder="Your answer">
        <button onclick="checkAnswer()">Submit Answer</button>
    `;
}

// Function to check the answer
function checkAnswer() {
    const answerInput = document.getElementById('answerInput');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const currentPuzzle = puzzles[currentLevel];

    if (userAnswer === currentPuzzle.answer.toLowerCase()) {
        score += 10;
        displayResult("correct");
    } else {
        strikeCount++;
        if (strikeCount === 3) {
            displayResult("gameOver");
        } else {
            displayResult("incorrect");
        }
        // Enable input and submit button after showing the result
        document.getElementById('answerInput').disabled = false;
        document.querySelector('button').disabled = false;
    }
}

// Function to display game over message and ask for restart
function showGameOverMessage() {
    const restart = confirm("Game Over! Do you want to restart?");
    if (restart) {
        restartGame();
    }
}

// Function to display result
function displayResult(result) {
    const resultContainer = document.getElementById('result');
    const currentPuzzle = puzzles[currentLevel];
    
    if (result === "correct") {
        resultContainer.innerHTML = `Correct! Your score: ${score}`;
    } else if (result === "gameOver") {
        resultContainer.innerHTML = "Game Over! You've reached 3 strikes.";
        // Show game over message and ask for restart
        setTimeout(() => {
            showGameOverMessage();
        }, 500);
    } else {
        resultContainer.innerHTML = `Incorrect! Hint: ${currentPuzzle.hint}`;
        document.getElementById('strikeCount').textContent = strikeCount;
    }

    // Disable input and submit button
    document.getElementById('answerInput').disabled = true;
    document.querySelector('button').disabled = true;

    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

// Function to display hint
function getHint() {
    const currentPuzzle = puzzles[currentLevel];
    alert(currentPuzzle.hint);
}

// Function to move to the next puzzle
function nextPuzzle() {
    currentLevel++;
    if (currentLevel < puzzles.length) {
        document.getElementById('answerInput').value = ""; // Clear input field
        displayPuzzle();
        // Reset result container and enable input and submit button
        document.getElementById('result').innerHTML = "";
        document.getElementById('answerInput').disabled = false;
        document.querySelector('button').disabled = false;
        document.getElementById('nextBtn').disabled = true; // Disable next button until answer is submitted
    } else {
        // End of game
        const endTime = new Date().getTime();
        const totalTime = (endTime - startTime) / 1000; // Time in seconds
        const timeBonus = Math.round((120 - totalTime) * 2); // 2 points per second remaining (maximum 240 points)
        score += timeBonus;
        alert(`Congratulations! You've completed all puzzles. Final score: ${score}`);
        // You can add more functionality here, like restarting the game or showing a leaderboard
    }
}

// Function to restart the game
function restartGame() {
    currentLevel = 0;
    score = 0;
    strikeCount = 0;
    startTime = new Date().getTime();
    shuffle(puzzles); // Shuffle puzzles again
    displayPuzzle();
    document.getElementById('result').innerHTML = ""; // Clear result message
    document.getElementById('strikeCount').textContent = "0"; // Reset strike count
}

// Display the first puzzle when the page loads
window.onload = function() {
    displayPuzzle();

    // Update timer every second
    setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000; // Time in seconds
    const remainingTime = Math.max(0, 120 - elapsedTime); // Maximum game time: 120 seconds
    document.getElementById('time').textContent = remainingTime.toFixed(0); // Display remaining time
}