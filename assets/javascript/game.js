// GLOBAL VARIABLES (accessible by all functions)
// ==================================================================================================

// array of word options (all lowercase)
var wordsList = ["jerome", "neena", "darion", "lou", "greg", "jordan",
  "jasmine", "stephen", "jacob", "adam", "rui", "luis"];

// computer selected solution will be held here
var chosenWord = "";

// this will break the solution into individual letters to be stored in array
var lettersInChosenWord = [];

// this will be the number of blanks we show based on the solution
var numBlanks = 0;

// holds a mix of blank and solved letters (ex: 'n, _ _, n, _')
var blanksAndSuccesses = [];

// holds all of the wrong guesses
var wrongGuesses = [];

// holds the letters guessed
var letterGuessed = "";

// game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// ==================================================================================================

// startGame()
// it's how we we will start and restart the game
// (note: it's not being run here. function declarations like this are made for future use.)
function startGame() {

  // reset the guesses back to 0
  numGuesses = 9;

  // solution chosen randomly from wordList
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

  // the word is broken into individual letters
  lettersInChosenWord = chosenWord.split("");

  // we count the number of letters in the word
  numBlanks = lettersInChosenWord.length;

  // we print the solution in console (for testing)
  console.log(chosenWord);

  // CRITICAL LINE
  // here we *reset* the guess and success array at each round
  blanksAndSuccesses = [];

  // CRITICAL LINE
  // here we *reset* the wrong guesses from the previous round
  wrongGuesses = [];

  // fill up the blanksAndSuccesses list with appropriate number of blanks
  // this is based on number of letters in solution
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // print the initial blanks in console
  console.log(blanksAndSuccesses);

  // reprints the guessesLeft to 9
  document.getElementById("guesses-left").innerHTML = numGuesses;

  // prints the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

  // clears the wrong guesses from the previous round
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// checkLetters() function
// it's where we will do all of the comparisons for matches
// again, it's not being called here. It's just being made for future use
function checkLetters(letter) {

  // this boolean will be toggled based on whether or not
  // a user letter is found anywhere in the word
  var letterInWord = false;

  // check if a letter exists inside the array at all
  for (var i = 0; i < numBlanks; i++) {

    if (chosenWord[i] === letter) {

      // if the letter exists then toggle this boolean to true
      // this will be used in the next step
      letterInWord = true;
    }
  }

  // if the letter exists somewhere in the word,
  // then figure out exactly where (which indices)
  if (letterInWord) {

    // loop through the word
    for (var j = 0; j < numBlanks; j++) {

      // populate the blanksAndSuccesses with every instance of the letter
      if (chosenWord[j] === letter) {

        // here we set specific blank spaces to equal the correct letter
        // when there is a match
        blanksAndSuccesses[j] = letter;
      }
    }

    // log the current blanks and successes for testing
    console.log(blanksAndSuccesses);
  }

  // if the letter doesn't exist at all...
  else {

    // then we add the letter to the list of wrong letters
    wrongGuesses.push(letter);

    // we also subtract one of the guesses
    numGuesses--;

  }

}

// roundComplete() function
// here we will have all of the code that needs to be run after each guess is made
function roundComplete() {

  // first, log an initial status update in the console
  // telling us how many wins, losses, and guesses are left
  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);


  // HTML UPDATES
  // ============

  // update the HTML to reflect the new number of guesses
  document.getElementById("guesses-left").innerHTML = numGuesses;

  // this will print the array of guesses and blanks onto the page
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

  // this will print the wrong guesses onto the page
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

  // if our word guess string equals the solution
  // (meaning that we guessed all the letters to match the solution)...
  if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {

    // add to the win counter
    winCounter++;

    // give the user an alert
    alert("You win!");

    // update the win counter in the HTML
    document.getElementById("win-counter").innerHTML = winCounter;

    // restart the game
    startGame();
  }

  // if we've run out of guesses
  else if (numGuesses === 0) {

    // add to the loss counter
    lossCounter++;

    // give the user an alert
    alert("You lose");

    // update the loss counter in the HTML
    document.getElementById("loss-counter").innerHTML = lossCounter;

    // restart the game
    startGame();

  }

}


// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================

// starts the Game by running the startGame() function
startGame();

// then initiates the function for capturing key clicks
document.onkeyup = function(event) {

  // converts all key clicks to lowercase letters
  letterGuessed = String.fromCharCode(event.which).toLowerCase();

  // runs the code to check for correct guesses
  checkLetters(letterGuessed);

  // runs the code that ends each round
  roundComplete();
};
