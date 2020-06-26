// Create a list that holds all of your cards - Done
let listOfCards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

// Shuffle the list of cards using the provided "shuffle" method below - Done
// Shuffle function from http://stackoverflow.com/a/2450976
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
// shuffle(listOfCards);

// loop through each card and create its HTML - Done
const deck = document.querySelector('.deck');
const fragmentCard = document.createDocumentFragment();

for (let i = 0; i < listOfCards.length; i++) {
    const newElementCard = document.createElement('li');
    newElementCard.className = 'card';
    const newElementIcon = document.createElement('i');
    newElementIcon.className = listOfCards[i];
    newElementCard.appendChild(newElementIcon);
    fragmentCard.appendChild(newElementCard);
}

// add each card's HTML to the page - Done
deck.appendChild(fragmentCard);

// set up the event listener for a card. If a card is clicked - Done
let cardsOpen = [];

deck.addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'LI') {
        evt.target.className = 'card open show';
        const icon = evt.target.querySelector('i').className;
        cardsOpen.push(icon);
        console.log(cardsOpen);
        if (cardsOpen.length === 2) {
            //Two cards match
            if (cardsOpen[0] === cardsOpen[1]) {
                const match = deck.getElementsByClassName(cardsOpen[0]);
                match[0].parentElement.className = 'card match';
                match[1].parentElement.className = 'card match';
            } 
            //Two cards not match
            else {
                // const label1 = deck.getElementsByClassName(cardsOpen[0]);
                // const label2 = deck.getElementsByClassName(cardsOpen[1]);
                // console.log(label1);
                // console.log(label2);
            }
            cardsOpen = [];
        }
    }
});


//   - if the list already has another card, check to see if the two cards match
//     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//     + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
