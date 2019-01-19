// variable for start or reset game
var play = true;
var timeremaining;
var score;
var correct;

document.getElementById("startreset").onclick = function(){

    if (play == false){
        location.reload();
    }
    else{
        play = false; // set it false so on reset page reloads
    
        document.getElementById("startreset").innerHTML = "Reset Game"; // Change start game to reset game

        show("time") // Show the timer.
        
        timeremaining = 10;

        // Start countdown
        startCountdown();

        score = 0;
        // Generate questions and handling all main logic
        getQuestions();


    }
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

// Function to generate questions and handling to score all the main logic
function getQuestions(){

    // Generate two random numbers b/w 0 and 10
    let x = 1 + Math.floor(9 * Math.random());
    let y = 1 + Math.floor(9 * Math.random());
    
    // Store the correct answer
    correct = x * y;

    // array store all options
    var answers = [correct]

    // Generate random number b/w 0 and 5 
    let correctbox = 1 + Math.floor(3 * Math.random());

    //show the question
    document.getElementById("question").innerHTML = x + " x " + y;

    // Display the correct option in correct box
    document.getElementById("box" + correctbox).innerHTML = correct;

    // Generate 3 incorrect options
    for (let i = 1; i < 5; i++){

        // If box is not correct option box 
        if (i != correctbox){
            // Generate numbers
            do{
            
                wronganswer = (1 + Math.floor(9 * Math.random())) * (1 + Math.floor(9 * Math.random())); // Multiply to one digit numbers
            }
            while (answers.indexOf(wronganswer) >= 0) // If it is already generated or correct answer generate again

            // Add the generated number in array so that it can be checked for other options
            answers.push(wronganswer);
            
            // Show other options 
            document.getElementById("box" + i).innerHTML = wronganswer;
        }
    }

}