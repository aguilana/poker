const { evaluatePokerHand } = require('../utils')
const { testHands } = require('../data/testHands.js')

describe('Evaluate each poker hand - evaluatePokerHand()', () => {
    testHands.forEach((data, i) => {
        test(`${data.hand} should be a ${data.handRankName}`, () => {
            expect(evaluatePokerHand(data.hand)).toStrictEqual({ handRankName: data.handRankName, cardsToKeep: data.cardsToKeep, rank: data.rank });
        });
    })
})