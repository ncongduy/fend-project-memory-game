//Create a list that holds all of cards
let listOfCards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

//Declare variable
const deck = document.querySelector('.deck');
const fragmentCard = document.createDocumentFragment();
let cardsOpen = [];
let interval = null;

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

//Delete cards 
function deleteCards() {
    cardsOpen = [];
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

//Set up count movement
function countMove() {
    const moves = document.querySelector('.moves');
    const stringMoves = moves.textContent;
    let numberMoves = parseInt(stringMoves, 10);
    numberMoves += 1;
    moves.textContent = numberMoves.toString();
}

//Set up two number letter which is lower than 10: 00, 01, 02,...
function addZero(value) {
    let time = value.toString();
    if (time.length < 2) {
        return "0" + time;
    } else {
        return time;
    }
}

//Set up Timer
function timer() {
    const startTime = Date.now();
    interval = setInterval(function () {
        let deltaTime = Date.now() - startTime;
        let minutes = Math.floor(deltaTime / (60 * 1000));
        let seconds = Math.floor(deltaTime % (60 * 1000) / 1000);
        let minutesLabel = document.querySelector('#minutes');
        let secondsLabel = document.querySelector('#seconds');
        minutesLabel.textContent = addZero(minutes);
        secondsLabel.textContent = addZero(seconds);
    }, 1000);
}

//Run timer when click first card
function click(evt){
    if (evt.target.nodeName === 'LI') {
        timer();
        deck.removeEventListener('click', click);
    }
}

deck.addEventListener('click', click);

//Stop Timer when win game
function clearTimer() {
    clearInterval(interval);
}

//Set up the event listener for a card. If a card is clicked
function addCardsListener() {
    deck.addEventListener('click', function (evt) {
        if (evt.target.nodeName === 'LI') {
            evt.target.className = 'card open show';
            const icon = evt.target.querySelector('i').className;
            cardsOpen.push(icon);
            if (cardsOpen.length === 2) {
                countMove();
                twoCardsMatch();
                setTimeout(twoCardsNotMatch, 500);
            }
        }
    });
}

//   - if the list already has another card, check to see if the two cards match
//     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) - Done
//     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) - Done
//     + increment the move counter and display it on the page (put this functionality in another function that you call from this one) - Done
//     + add count time - Done
//     + fix mistake double click one card
//     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

//Run code
shuffle(listOfCards);
addCardsToPage();
addCardsListener();