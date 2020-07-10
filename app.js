//Whack-A-Mole Game
var hitScore = document.querySelector(".hits") ;
let hits = 0 ;
var timeRemaining = document.querySelector(".timer");
let time = 10 ;
let lastHole = 0 ;
let gameOver = false ;
var startButton = document.querySelector(".button-start") ;
var whackSound = new Audio('whack_sound.wav');

function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
}

multiplyNode(document.querySelector(".game"), 9, true);

const holes = document.querySelectorAll(".image-hole"); //holes recognizes each hole in our node list (from hole)
const moles = document.querySelectorAll(".image-mole");
console.log(holes);

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min); //random number between min and max (rounded)
}

function randomHole(holes) {
    //console.log(holes.length) ;
    const index = Math.floor(Math.random() * holes.length); //generates the random hole
    if (lastHole == index) { //check if the last hole for the mole was used, if yes then recurse again
        console.log("That's the same hole!") ; 
        return randomHole(holes) ;
    }
    lastHole = index ;
    return index ;
}

function popMole() {
    const time = randomTime(600, 1000); //get random time b/w over 2 ms and 1s
    const index = randomHole(holes) ; //get your random hole
    moles[index].classList.add("show");
    //console.log(index) ;
    //set a timeout so the mole disappears after the given random time
    setTimeout(() => {
        moles[index].classList.remove("show");
        //unless game over, keep running (aka in this function, gameover right now is always true)
        if (!gameOver) {
            popMole() ;
        }
    }, time) ; 
}

// for clicking and removing a mole (function)
function clickMole() {
    for (var i = 0 ; i < moles.length ; i++) {
        var mole = moles[i];
        mole.onclick = function() {
        //    clickMole(i) ;
            whackSound.play();
            this.classList.remove("show");
            hits++;
            hitScore.textContent = hits;
        };
    }
}

clickMole() ;

function startGame() {
    hitScore.textContent = 0;
    timeRemaining.textContent = 10 ;
    time = 10 ;
    hits = 0 ;
    timer() ;
    gameOver = false ; //for playing again
    popMole() ;
    startButton.disabled = true ;
    //after 10 seconds, end the game 
    setTimeout(() => {
        gameOver = true ;
        startButton.disabled = false ;
    }, 10000); 
}

function timer() {
    var timesUp = setInterval(function() {
        time--;
        timeRemaining.textContent = time ;
        if (time == 0) {
            clearInterval(timesUp);
        }
    }, 1000);
}