//Declare variable
const deck = document.querySelector('.deck');
const fragmentCard = document.createDocumentFragment();
const popUpBox = document.querySelector('.announce');
const moves = document.querySelector('.moves');
const stringMoves = moves.textContent;
let numberMoves = parseInt(stringMoves, 10);
let cardsOpen = [];
let interval;
let minutesLabel = document.querySelector('#minutes');
let secondsLabel = document.querySelector('#seconds');

//Create a list that holds all of cards
let listOfCards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

//Shuffle the list of cards; Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Add cards to page
function addCardsToPage() {
    for (let i = 0; i < listOfCards.length; i++) {
        const newElementCard = document.createElement('li');
        newElementCard.className = 'card';
        const newElementIcon = document.createElement('i');
        newElementIcon.className = listOfCards[i];
        newElementCard.appendChild(newElementIcon);
        fragmentCard.appendChild(newElementCard);
    }

    deck.appendChild(fragmentCard);
}

//Set up the event listener for a card. If a card is clicked
function addCardsListener() {
    deck.addEventListener('click', function (evt) {
        if (evt.target.nodeName === 'LI' && evt.target.className === 'card') {
            evt.target.className = 'card open show';
            const icon = evt.target.querySelector('i').className;
            cardsOpen.push(icon);
            if (cardsOpen.length === 2) {
                countMove();
                twoCardsMatch();
                setTimeout(twoCardsNotMatch, 500);
            }
            winGame();
        }
    });
}

//Set up count movement
function countMove() {
    numberMoves += 1;
    moves.textContent = numberMoves.toString();
}

//Open two cards when match
function twoCardsMatch() {
    if (cardsOpen[0] === cardsOpen[1]) {
        const match = deck.getElementsByClassName(cardsOpen[0]);
        match[0].parentElement.className = 'card match';
        match[1].parentElement.className = 'card match';
        deleteCards();
    };
}

//Close two cards when NOT match
function twoCardsNotMatch() {
    if (cardsOpen[0] !== cardsOpen[1]) {
        const diff1 = deck.getElementsByClassName(cardsOpen[0]);
        const diff2 = deck.getElementsByClassName(cardsOpen[1]);
        diff1[0].parentElement.className = 'card';
        diff1[1].parentElement.className = 'card';
        diff2[0].parentElement.className = 'card';
        diff2[1].parentElement.className = 'card';
        deleteCards();
    }
}

//Delete cards 
function deleteCards() {
    cardsOpen = [];
}

//Win game
function winGame() {
    const cardsGame = deck.querySelectorAll('li');
    let cardMatch = [];
    for (let i = 0; i < cardsGame.length; i++) {
        if (cardsGame[i].className === 'card match') {
            cardMatch.push(cardsGame[i].className);
            if (cardMatch.length === cardsGame.length) {
                StopTimer();
                setTimeout(popUpMessage, 500);
            }
        }
    }
}

//Set up Timer
function timer() {
    const startTime = Date.now();
    interval = setInterval(function () {
        let deltaTime = Date.now() - startTime;
        let minutes = Math.floor(deltaTime / (60 * 1000));
        let seconds = Math.floor(deltaTime % (60 * 1000) / 1000);
        minutesLabel.textContent = addZeroIntoNumber(minutes);
        secondsLabel.textContent = addZeroIntoNumber(seconds);
    }, 1000);
}

//Set up two number letter which is lower than 10: 00, 01, 02,...
function addZeroIntoNumber(value) {
    let time = value.toString();
    if (time.length < 2) {
        return "0" + time;
    } else {
        return time;
    }
}

//Run timer when click first card
function click(evt) {
    if (evt.target.nodeName === 'LI') {
        timer();
        deck.removeEventListener('click', click);
    }
}

deck.addEventListener('click', click);

//Stop Timer when win game
function StopTimer() {
    clearInterval(interval);
}

// Pop up message when win game
function popUpMessage() {
    popUpBox.innerHTML =
        `<div class="popUpContainer">
            <div>Congratulation! You won the game.</div>
            <div>You used <b>${moves.textContent}</b> moves and <b>${minutesLabel.textContent}</b> minutes <b>${secondsLabel.textContent}</b> seconds</div>
            <div class="ratingStar">${voteStart()}</div>
            <div>Do you want to play again?</div>
            <div class="boxAnswer">
                <span class="answer yes">Yes</span>
                <span class="answer no">No</span>
            </div>
        </div>`;
    const yesIcon = document.querySelector('.yes');
    const noIcon = document.querySelector('.no');
    yesIcon.addEventListener('click', function(){
        location.reload();
    });
    noIcon.addEventListener('click', function(){
        popUpBox.innerHTML = "";
    });    
}

// Rating star
function voteStart() {
    if (numberMoves >= 0 && numberMoves <= 16) {
        return (
            `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`
        )
    } else if (numberMoves > 16 && numberMoves <= 20) {
        return (
            `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star-o"></i></li>`
        )
    } else {
        return (
            `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star-o"></i></li>
            <li><i class="fa fa-star-o"></i></li>`
        )
    }
}

//Restart game
function restart() {
    const restartIcon = document.querySelector('.restart');
    restartIcon.addEventListener('click', function () {
        location.reload();
    })
}

//Run code
shuffle(listOfCards);
addCardsToPage();
addCardsListener();
restart();