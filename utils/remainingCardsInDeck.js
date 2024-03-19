const { createDeck } = require('./createAndDraw.js');

function remainingCardsInDeck(hand) {
    let deck = createDeck();
    deck = deck.filter(card => !hand.includes(card));
    return deck;
}

module.exports = { remainingCardsInDeck }