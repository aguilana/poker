/**
 * CARDS IN HAND
 * 2 3 4 5 6 7 8 9
 * T for 10 ,J for Jack, Q for Queen, K for King, A for Ace
 * 
 */

const {
    remainingCardsInDeck,
    runMulliganHandImprovementProbability,
    evaluatePokerHand,
    findCardsToMulligan,
    createShuffledDeckAndDraw
} = require('./utils')

/**
 * 
 * OPTIMAL POKER HAND function will:
    - create a shuffled deck and draw 5 cards
    - evaluate the hand
    - find the cards to mulligan (if any) based on the evaluation
    - calculate the probability of getting a better hand if the user mulligans (isn't required to mulligan)
    - return a string that tells the user the optimal poker hand to keep
 * 
 * @returns {string} - a string that tells the user the optimal poker hand to keep
 */

function optimalPokerHand() {
    const resultFromDraw = createShuffledDeckAndDraw();
    const evalHand = evaluatePokerHand(resultFromDraw.hand);
    const remainingCards = resultFromDraw.deck;
    const cardsToMulligan = findCardsToMulligan(resultFromDraw.hand);
    const probability = runMulliganHandImprovementProbability(evalHand, remainingCards, cardsToMulligan);
    console.log(cardsToMulligan.length > 0
        ? `If you mulligan ${cardsToMulligan.length === 1 ? `${cardsToMulligan.length} card` : `${cardsToMulligan.length} cards`}- ${cardsToMulligan} - \nand keep ${evalHand.cardsToKeep.length} - ${evalHand.cardsToKeep} - \nyou have a ${probability} chance of drawing a stronger hand`
        : `Hand is already near optimal - \n${evalHand.handRankName}.`)
    return {
        selectionToMulligan: cardsToMulligan,
        probabilityOfStrongerHand: probability
    }
}

console.log(optimalPokerHand());
