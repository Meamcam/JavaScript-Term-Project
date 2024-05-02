$(document).ready(function() {
    // Dropdown functionality
    $('.game-box').hover(
        function() {
            $(this).find('.dropdown-content').slideDown();
        },
        function() {
            $(this).find('.dropdown-content').slideUp();
        }
    );

    // Show game descriptions on hover
    $('.game-btn').hover(
        function() {
            var gameDescription = $(this).attr('data-description');
            $(this).siblings('.dropdown-content').text(gameDescription).slideDown();
        },
        function() {
            $(this).siblings('.dropdown-content').slideUp();
        }
    );

    // Change background color of game titles on hover
    $('.game-btn').hover(
        function() {
            $(this).css('background-color', '#555');
        },
        function() {
            $(this).css('background-color', 'transparent');
        }
    );

    // Function to handle clicking on game links
    $('.game-btn').click(function(event) {
        event.preventDefault(); // Prevent default link behavior
        var gameUrl = $(this).attr('href'); // Get the URL of the game
        window.location.href = gameUrl; // Redirect to the game URL
    });
});

// Define functions to handle button clicks for each game
function playNessiesQuest() {
    // Add logic to start or navigate to Nessie's Quest game
    window.location.href = "NessiesQuest.html"; // Example: Navigate to Nessie's Quest page
}

function playCryptidMatch() {
    // Add logic to start or navigate to Cryptid Habitat Match game
    window.location.href = "CryptidMatch.html"; // Example: Navigate to Cryptid Habitat Match page
}

function playWhosThatCryptid() {
    // Add logic to start or navigate to Who's That Cryptid? game
    window.location.href = "WhosThatCryptid.html"; // Example: Navigate to Cryptid Riddle page
}
