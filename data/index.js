const { testHands } = require('./testHands');
const { evaluatePokerHand, findCardsToMulligan, remainingCardsInDeck, runMulliganHandImprovementProbability } = require('../utils');

function runTestCases() {
    testHands.forEach((data, i) => {
        console.log(`Test #${i + 1} - Probability Testing - ${data?.expectedProbability ? data.expectedProbability : ''}`);
        const { hand } = data

        const evalHand = evaluatePokerHand(hand);
        const cardsToMulligan = findCardsToMulligan(hand);
        const remainingCards = remainingCardsInDeck(hand);

        const probability = runMulliganHandImprovementProbability(evalHand, remainingCards, cardsToMulligan);

        console.log(cardsToMulligan.length > 0
            ? `If you mulligan ${cardsToMulligan} - ${cardsToMulligan.length === 1 ? `${cardsToMulligan.length} card` : `${cardsToMulligan.length} cards`} - and keep ${evalHand.cardsToKeep}, you have a ${probability} chance of getting a stronger hand`
            : `Hand is already near optimal - ${evalHand.handRankName}.`)

        console.log({
            selectionToMulligan: cardsToMulligan,
            probabilityOfStrongerHand: probability
        })

    });
}




module.exports = {
    testHands
}