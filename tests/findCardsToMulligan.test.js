const { findCardsToMulligan } = require('../utils')
const { testHands } = require('../data')
const { cardValue } = require('../utils')

describe('Find cards to mulligan - findCardsToMulligan()', () => {
    testHands.forEach((data, i) => {
        const { hand, cardsToKeep } = data
        // need to sort this because this is not running through the functions that sort it within
        const cardsToMulligan = hand.filter(card => !cardsToKeep.includes(card)).sort((a, b) => cardValue(a) - cardValue(b));
        let expectedRank;
        for (let rank in data.expected) {
            if (data.expected[rank]) {
                expectedRank = rank;
                break;
            }
        }
        test(`${expectedRank} of ${hand} should return ${cardsToMulligan}`, () => {
            expect(findCardsToMulligan(hand)).toStrictEqual(cardsToMulligan);
        });
    })
}
)