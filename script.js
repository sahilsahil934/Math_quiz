// variable for start or reset game
var play = true;
var timeremaining;

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


    }
}

// Function to change display property to block.
function show(Id){
    document.getElementById(Id).style.display = "block"; 
}

// Function to change display property to none.
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

// Function that will count from 60 to zero and stop the game
function startCountdown(){
    
    //start Interval
    time = setInterval(function(){
        
        timeremaining -= 1; // Reduce time every second
        document.getElementById("timeremaining").innerHTML = timeremaining; // Update time on the page
       // If the remaining time is 0 second show the gameover
        if (timeremaining == 0)
        {
            clearInterval(time); // Clear time Interval
            hide("time");
            show("gameover");
        }
    }, 1000);
}