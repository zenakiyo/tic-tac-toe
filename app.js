const squareC = document.querySelectorAll(".squareC")
const playerOneDis = document.querySelector("#playerOneDis");
const playerTwoDis = document.querySelector("#playerTwoDis");

const winCombi = [
    ['box1', 'box2', 'box3'],
    ['box4', 'box5', 'box6'],
    ['box7', 'box8', 'box9'],
    ['box1', 'box4', 'box7'],
    ['box2', 'box5', 'box8'],
    ['box3', 'box6', 'box9'],
    ['box1', 'box5', 'box9'],
    ['box3', 'box5', 'box7'],
]
let playerOne = [];
let playerTwo = [];
let usedSquare = [];

// Checking turns for players, true = PlayerOne turn and false = PlayerTwo
let turnCheck = true;

function play(e) {
    if (usedSquare.length <= 8){
        if(turnCheck && !usedSquare.includes(e.target.id)){
            e.target.classList.add("pOneColor");
            usedSquare.push(e.target.id);
            playerOne.push(e.target.id);
            turnCheck = false;
        }
        else if(!turnCheck && !usedSquare.includes(e.target.id)){
            e.target.classList.add("pTwoColor");
            usedSquare.push(e.target.id);
            playerTwo.push(e.target.id);
            turnCheck = true;
        }
        else {
            alert(`BOX ALREADY IN USE`)
        }
        winCheck(playerOne, playerTwo, winCombi);
    }
    else {
        alert(`OUT OF OPTIONS`)
    }
}

// playfunc ensure that nothing hppens after gave is over
let playfunc = true;

// for listning all the events on squares
squareC.forEach(square =>{
    square.addEventListener("click", (e)=>{
        if(playfunc){
            play(e);
        }
    })
})


// game's logic it checks after every move which player has won
function winCheck(arr1, arr2, arrWC) {

    let pOneResult
    if(arr1.length >= 3){
        pOneResult = arrWC[0].every(e => arr1.includes(e)) 
            || arrWC[1].every(e => arr1.includes(e))
            || arrWC[2].every(e => arr1.includes(e))
            || arrWC[3].every(e => arr1.includes(e))
            || arrWC[4].every(e => arr1.includes(e))
            || arrWC[5].every(e => arr1.includes(e))
            || arrWC[6].every(e => arr1.includes(e))
            || arrWC[7].every(e => arr1.includes(e));
    }
    
    let pTwoResult
    if(arr2.length >= 3){
        pTwoResult = arrWC[0].every(e => arr2.includes(e)) 
            || arrWC[1].every(e => arr2.includes(e))
            || arrWC[2].every(e => arr2.includes(e))
            || arrWC[3].every(e => arr2.includes(e))
            || arrWC[4].every(e => arr2.includes(e))
            || arrWC[5].every(e => arr2.includes(e))
            || arrWC[6].every(e => arr2.includes(e))
            || arrWC[7].every(e => arr2.includes(e));
    }

    // for Displaying the winner and checking if either has won
    if(pOneResult){
        playfunc = false;
        playerOneDis.textContent = `YOU WON!!`;
        playerTwoDis.textContent = `YOU LOST!!`;

    }
    else if(pTwoResult){
        playfunc = false;
        playerTwoDis.textContent = `YOU WON!!`;
        playerOneDis.textContent = `YOU LOST!!`;
    }
    else if(!pOneResult && !pTwoResult && usedSquare.length == 9){
        alert(`IT'S A DRAW, SHAKE HANDS NOT FIST`)
    }
}
