/*
GAME FUNCTION
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max), // TODO: random number
    guessesLeft = 3

// UI Elements 
const game = document.querySelector('#game'), 
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message')
    

// Assign UI min and max
minNum.textContent = min
maxNum.textContent = max


//Play again event listener
game.addEventListener('mousedown', function(e) { //with click as soon as we click submit it reads clicks again when mousedown
    if(e.target.className === 'play-again') {
        window.location.reload()
    }
})

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value)

    //Validate
    if(isNaN(guess) || guess < minNum || guess > maxNum) {
        setMessage(`Please enter a number between ${minNum} and ${maxNum}`, 'red')
    }

    // Check if won
    if (guess === winningNum) {
        //Game over - Won
        gameOver(true, `${winningNum} is correct, YOU WIN!`)
    } else {
        // Wrong number
        guessesLeft -= 1
        if (guessesLeft === 0) {
        //Game over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
        } else {
            //game continues - answer wrong

            //Change border color
            guessInput.style.borderColor = 'red'
            //Clear input
            guessInput.value = ''
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }
    }
})

//Game over
function gameOver(won, msg) {
    let color 
    won === true ? color = 'green' : color = 'red'
    //Disable input
    guessInput.disabled = true
    //Change border color
    guessInput.style.borderColor = color
    //Set text color
    message.style.color = color
    //SetMessage
    setMessage(msg, color)

    // Play again?
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again'
}

// Get winning number
function getRandomNum(min, max) { //hoisting -> functions are put to the top when the execution context runs // we can call functions before actually calling'em
   return Math.floor(Math.random()*(max-min+1))
}

//Set Message
function setMessage(msg, color) {
    message.style.color = color
    message.textContent = msg
}

          
