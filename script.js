// variable for start or reset game
var play = true;
var timeremaining;
var score;
var correct;
var operator;
var symbol;
var level = 0;


document.getElementById("startreset").onclick = function(){

    if (play == false){
        location.reload();
    }
    else{
        play = false; // set it false so on reset page reloads

        show("difficulty");
        hide("gameover");
    }
}


function start(){

  document.getElementById("startreset").innerHTML = "Reset Game"; // Change start game to reset game

  show("time") // Show the timer.

  timeremaining = 60;

  // Start countdown
  startCountdown();

  score = 0;

  // Generate questions and handling all main logic
  getQuestions(level);
}


// Function to change display property to block.
function show(Id){
    document.getElementById(Id).style.display = "block";
}

// Function to change display property to none.
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

// Function that will count from 60 to zero and stop the game
function startCountdown(){

    //start Interval
    time = setInterval(function(){

        timeremaining -= 1;  // Reduce time every second

        document.getElementById("timeremaining").innerHTML = timeremaining; // Update time on the page

       // If the remaining time is 0 second show the gameover
        if (timeremaining == 0){

            clearInterval(time); // Clear time Interval

            hide("time");   // Hide time reamining

            scorebox(); // Show gameover box and score
        }
    }, 1000);
}

// Function shows game over box and show result
function scorebox(){

    //Show the game over box and print content
    document.getElementById('gameover').innerHTML = "<p>Game Over</p><p>Your Score : " + score + " </p>"
    show("gameover");

}
var correctbox


// Listen for the click on the answer
for (let i = 1; i < 5; i++){
    document.getElementById("box" + i).onclick = function(){

        // If game is in play mode
        if (play == false){
            // If clicked is correct
            if (i == correctbox){

                score += 1; // Increase score
                document.getElementById("score-value").innerHTML = score;
                show("correct"); // Show correct
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                getQuestions(level);
            }
            // If clicked is incorrect
            else{
                show("wrong");  // Show Try again
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

// Listening for the click of level
for (let j = 1; j < 4; j++){
    document.getElementById("level" + j).onclick = function(){

    level = j;

    hide("difficulty");

    start();
  }
}



// Function to generate questions and handling to score all the main logic
function getQuestions(value){

    // Generate two random numbers b/w 0 and 10
    let x = 1 + Math.floor((value * 9) * Math.random());
    let y = 1 + Math.floor((value * 9) * Math.random());

    operator =  correctbox = 1 + Math.floor(3 * Math.random());

    switch(operator){
      case 1:
          correct = x + y;
          symbol = ' + '
          break;
      case 2:
          correct = x * y;
          symbol = ' x '
          break;
      case 3:
          correct = x - y;
          symbol = ' - ';
          break;
      default:
          getQuestions(level);
    }

    // array store all options
    var answers = [correct]

    // Generate random number b/w 0 and 5
    correctbox = 1 + Math.floor(3 * Math.random());

    //show the question
    document.getElementById("question").innerHTML = x + symbol + y;

    // Display the correct option in correct box
    document.getElementById("box" + correctbox).innerHTML = correct;

    // Generate 3 incorrect options
    for (let i = 1; i < 5; i++){

        // If box is not correct option box
        if (i != correctbox){
            // Generate numbers
            do{

                if (operator == 1){
                  wronganswer = (1 + Math.floor((value * 9) * Math.random())) + (1 + Math.floor((value * 9) * Math.random())); // Add to one digit numbers
                }
                else if (operator == 2){
                  wronganswer = (1 + Math.floor((value * 9) * Math.random())) * (1 + Math.floor((value * 9) * Math.random())); // Multiply to one digit numbers
                }
                else if (operator == 3){
                  wronganswer = (1 + Math.floor((value * 9) * Math.random())) - (1 + Math.floor((value * 9) * Math.random())); // Difference to one digit numbers
                }
            }
            while (answers.indexOf(wronganswer) >= 0) // If it is already generated or correct answer generate again

            // Add the generated number in array so that it can be checked for other options
            answers.push(wronganswer);

            // Show other options
            document.getElementById("box" + i).innerHTML = wronganswer;
        }
    }

}
