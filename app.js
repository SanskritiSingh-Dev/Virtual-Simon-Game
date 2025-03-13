let gameSeq = []; // random colors ko store karna hai
let userSeq = []; //sequence generated kostore karne ke liye

//for random buttons
let btns = ["yellow", "red", "purple", "green"];

//initial value
let started = false;
let level = 0;

let h2 = document.querySelector('h2');

//start the game by presing any key
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        setTimeout(levelup, 1000);
    }
});
 
//flashing of the button function
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}


function levelup() {
    //when level up then sequence will be empty
    //every new level the user need to enter the seques in correct order.
    userSeq = [];
    //increase game level
    level++;
    h2.innerText = `Level ${level}`;

    //flash the button when clicked
    //random color generate
    let randIndex = Math.floor(Math.random() * 3);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}


//to check if the sequence is followed or not
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            levelup();
        }
    }
    else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"
        }, 250);
        //after game over reset the things to play again
        reset();
    }
}


// after pressing the button
function btnPress() {
    //to detect the button
    let btn = this;
    //after click button flash
    userFlash(btn);
    //to gey the color name 
    //add it to the useSeq
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");
for (b of allBtns) {
    b.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
