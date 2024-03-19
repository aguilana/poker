const { evaluatePokerHand, findCardsToMulligan, remainingCardsInDeck, runMulliganHandImprovementProbability } = require('../utils');
// const { remainingCardsInDeck, runMulliganHandImprovementProbability } = require('../utils/');
const { testHands } = require('../data/index.js');
const { Rank } = require('../utils/index.js');

describe('Evaluate each poker hand - evaluatePokerHand()', () => {
    test(' Probability should be around 0.99', () => {
        const hand = ['3H', '5C', '6D', '7S', '8H']
        const evaluatedHand = evaluatePokerHand(hand);
        const cardsToMulligan = findCardsToMulligan(hand);
        const remainingCards = remainingCardsInDeck(hand);
        const probability = runMulliganHandImprovementProbability(evaluatedHand, remainingCards, cardsToMulligan);
        expect(probability).toBeCloseTo(.99, 1);
    });

    test(' Probability should be around 0.507', () => {
        const hand = ['3H', '5C', '6D', '7S', 'AH'];
        const evaluatedHand = evaluatePokerHand(hand);
        const cardsToMulligan = findCardsToMulligan(hand);
        const remainingCards = remainingCardsInDeck(hand);
        const probability = runMulliganHandImprovementProbability(evaluatedHand, remainingCards, cardsToMulligan);
        expect(probability).toBeCloseTo(.507, 1);
    });


    testHands.forEach((data, i) =>
        test(`Test #${i + 1} - Probability Testing - ${data?.expectedProbability ? data.expectedProbability : ''}`, () => {
            const { hand, handRankName, expectedProbability } = data

            if (handRankName !== Rank.HIGH_CARD.name) {
                console.log(`Test #${i + 1} - This is not a high card hand`)
                return;
            }
            const evaluatedHand = evaluatePokerHand(hand);
            const cardsToMulligan = findCardsToMulligan(hand);
            const remainingCards = remainingCardsInDeck(hand);

            const probabilityOfBetterHand = runMulliganHandImprovementProbability(evaluatedHand, remainingCards, cardsToMulligan);

            expect(probabilityOfBetterHand).toBeCloseTo(expectedProbability, 1);
        }
        )
    )
})