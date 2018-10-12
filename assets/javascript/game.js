//when window on load, it will triger the program below
window.onload = function () {

  //made the variables first to use in the functions
  //array of words.
  var Words = ['pacman', 'gremlins', 'mtv', 'wham', 'gameboy', 'microwaves', 'ghostbusters', 'milli_vanilli', 'apple'
  ];
  var guesses = []; // stored correct guesses and blanks will be in this array
  var blanks = 0; // holds blanks spaces for the word chosen
  var currentWord = "";
  var currentLetters = [];
  // counters
  var winCounter = 0;
  var lossCounter = 0;
  var numGuesses = 12;
  
  
  // array for users guessed letters
  var guessedLetter = [];
  // array for users correct guesses
  var correctLetter = [];
  // guessed letters that are incorrect
  var incorrectGuess = [];
  
  // user input key
  var  userGuess = document.getElementById("playerChoice"); 
  
  // define a function called startGame which will print the blanks and set the total number of count
  function startGame() {
    numGuesses = 12;
    guesses = [];
    guessedLetter = [];
    incorrectGuess = [];
    // selects a words at random
    currentWord = Words[Math.floor(Math.random() * Words.length)];
    // splits the current word into letters, so that you can match the users guesses to the letters of the word
    currentLetters = currentWord.split("");
  
    // need to know how many blanks for a word
    blanks = currentLetters.length;
    for (var i = 0; i < blanks; i++) {
      guesses.push("_")
    }
    console.log(currentWord);
   
    userGuess.textContent = "";
    // print the blanks on the screen (refer to the below PrintResult function)
    PrintResult();
  }
  
  
  // define a checkLetters function which checks if users letter is in the word
  function checkLetters(letter) {
    //using boolean to check if the letter is in the word
    var letterInWord = false;
  
    // loop that goes through the length of the word
    for (var i = 0; i < blanks; i++) {
      if (currentWord[i] == letter) {
        letterInWord = true;
      }
    }
    if (letterInWord) {
      for (var i = 0; i < blanks; i++) {
  
        if (currentWord[i] == letter) {
          guesses[i] = letter
        }
      }
      console.log(guesses);
  
    } else {
      incorrectGuess.push(letter);
      numGuesses--;
      console.log("that was incorrect " + numGuesses + " are remaining");
    }
  }
  
  // define a PrintResult function which will print the result on the screen upon finishing 
  function PrintResult() {
  
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses + " | Key Entered: " + userGuess.textContent + " | Pokemon Name: " + guesses.join(" ") + " | Already Guessed: " + incorrectGuess.join(" "));
  
    
    // update the HTML to reflect the new number of guesses. also update the correct guesses
    document.getElementById("currentWord").innerHTML = "Back to the 80s: " + guesses.join(" ");
    document.getElementById("guessed").innerHTML = "Letters Already Guessed: " + incorrectGuess.join(" ");
    document.getElementById("playerChoice").innerHTML = "Key Entered: " + userGuess.textContent;
    document.getElementById("guessesRemaining").innerHTML = "Number of Guesses Remaining: " + numGuesses;
    
    
    // if we get all the letters to match the solution... 
    if (currentLetters.toString() == guesses.toString()) {
      winCounter++; // add to the win counter 
      document.getElementById("word").innerHTML = "The last word was " + currentWord;
      document.getElementById("imageID").src = "assets/images/" + currentWord + ".gif" ;
      document.getElementById("imageName").innerHTML = currentWord;
  
      // update the win counter in the HTML
      document.getElementById("winCounter").innerHTML = "You Have Won " + winCounter + " game(s)";
     // restart the game automatically
      startGame(); 
    }
  
    // if we've run out of guesses
    else if (numGuesses == 0) {
      lossCounter++; // add to the loss counter 
      document.getElementById("word").innerHTML = "The Last word was " + currentWord;
      document.getElementById("imageID").src = "assets/images/" + currentWord + ".gif" ;
      document.getElementById("imageName").innerHTML = currentWord;
  
      // update the loss counter in the HTML
      document.getElementById("lossCounter").innerHTML = "You Have Lost " + lossCounter + " game(s)";
  
      // restart the game automatically
      startGame(); 
    }
  
  }
  
  // main program - game start
  startGame(); //call startGame function
  // this function will run whenever the user presses a key after the game start
  document.onkeyup = function(event) {
    userGuess.textContent=event.key; 
    guessedLetter.push(userGuess.textContent);
    // runs the code to check for correctness (refer to the below checkLetters function)
    checkLetters(userGuess.textContent); 
    // print the final result on the screen (refer to the below PrintResult function)
    PrintResult();
  }
  }

  // minor bugs that need to be fixed: 
  // 1) good keys only feature so "delete", "shift", "return" aren't counted as bad guesses
  // 2) add sound clips if there's time