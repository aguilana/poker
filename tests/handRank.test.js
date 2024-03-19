
const handRankFunctions = require('../utils/handRanks.js');
const { testHands } = require('../data')
const { cardValue } = require('../utils')

describe('Test isRank functions', () => {
    testHands.forEach((data, i) => {
        const { hand, handRankName, expected } = data
        hand.sort((a, b) => cardValue(a) - cardValue(b));
        const isDataRankFunction = `is${handRankName.replace(/\s/g, '')}`; //
        test(`testing function - ${isDataRankFunction} - ${hand} should be a ${handRankName}`, () => {
            const bool = expected[isDataRankFunction]
            if (typeof handRankFunctions[isDataRankFunction] !== 'function') {
                console.error(`Function ${isDataRankFunction} does not exist.`);
            }
            expect(handRankFunctions[isDataRankFunction](hand)).toBe(bool);
        });
    }
    )
})