$(document).ready(function() {
    const cryptids = ['Bigfoot', 'Mothman']; // Add more cryptids here
    const totalCards = cryptids.length * 2 - 1; // One less card
    let score = 0;
    let timer = 0;
    let matchedPairs = 0;
    let flippedCards = [];
    let canFlip = true;
    let timerInterval;

    // Shuffle the cryptids array
    cryptids.sort(() => Math.random() - 0.5);

    // Initialize the game
    initGame();

    function initGame() {
        renderCards();
        startTimer();
    }

    function renderCards() {
        const gameContainer = $('.game-container');
        gameContainer.empty();

        let unpairedCryptid = cryptids[Math.floor(Math.random() * cryptids.length)]; // Randomly select one cryptid to remain unpaired

        cryptids.forEach(cryptid => {
            for (let i = 0; i < 2; i++) {
                if (cryptid !== unpairedCryptid || i === 0) { // Skip one card for the unpaired cryptid
                    const card = $('<div class="card"></div>');
                    const front = $('<div class="front"></div>').text('Cryptid');
                    const back = $(`
                        <div class="back">
                            <img src="media/${cryptid}.jpg" alt="${cryptid}">
                        </div>
                    `);
                    card.append(front, back);
                    gameContainer.append(card);
                }
            }
        });

        $('.card').click(function() {
            if (!canFlip) return;
            if ($(this).hasClass('flipped')) return;

            $(this).addClass('flipped');
            flippedCards.push($(this));

            if (flippedCards.length === 2) {
                canFlip = false;
                setTimeout(checkMatch, 1000);
            }
        });
    }

    function checkMatch() {
        const card1 = flippedCards[0].find('.back').text();
        const card2 = flippedCards[1].find('.back').text();

        if (card1 === card2) {
            score += 10;
            matchedPairs++;
            $('#score').text(score);
            if (matchedPairs === cryptids.length - 1) { // All but one pair matched
                endGame();
            }
        } else {
            flippedCards.forEach(card => card.removeClass('flipped'));
        }

        flippedCards = [];
        canFlip = true;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            $('#timer').text(timer);
        }, 1000);
    }

    function endGame() {
        $('.game-container').empty();
        $('.game-container').text('Congratulations! You have matched all cryptids except one!');
        clearInterval(timerInterval);
    }
});