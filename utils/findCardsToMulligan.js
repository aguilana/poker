const { evaluatePokerHand } = require('./evaluatePokerHand');
/**
 * Evaluates users hand
 * creates set of cards to keep (unique cards) using the cards to keep from the evaluation
 * creates a set of cards to mulligan by filtering the hand and checking if the cards to keep are not in the hand
 * 
 * @param {string[]} hand - a hand of 5 cards
 * @returns {string[]} - an array of cards to mulligan
 */
function findCardsToMulligan(hand) {
    const evaluation = evaluatePokerHand(hand);
    const cardsToKeep = new Set(evaluation.cardsToKeep);
    const cardsToMulligan = hand.filter(card => !cardsToKeep.has(card));

    return cardsToMulligan.length > 0 ? cardsToMulligan : [];
}

module.exports = { findCardsToMulligan }