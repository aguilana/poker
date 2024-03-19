
const { rankCounts, sortHandByRank } = require('../utils');

describe('rankCounts function', () => {
    test("correctly counts the frequency of each rank in a hand, should be { '2': 3, '3': 1, '5': 1 }, ", () => {
        const hand = ['2H', '3D', '2S', '5C', '2D'];
        const expectedCounts = { '2': 3, '3': 1, '5': 1 };
        const counts = rankCounts(hand);

        expect(counts).toEqual(expectedCounts);
    });

    test('returns an empty object for an empty hand, should be {}', () => {
        const hand = [];
        const expectedCounts = {};
        const counts = rankCounts(hand);

        expect(counts).toEqual(expectedCounts);
    });

    test("handles a hand with all unique ranks, should be { '2': 1, '3': 1, '4': 1, '5': 1, '6': 1 }", () => {
        const hand = ['2H', '3D', '4S', '5C', '6D'];
        const expectedCounts = { '2': 1, '3': 1, '4': 1, '5': 1, '6': 1 };
        const counts = rankCounts(hand);

        expect(counts).toEqual(expectedCounts);
    });

    test("handles a hand with 4 of a kind, should be { 'A': 4, 'K': 1 }", () => {
        const hand = ['AH', 'AD', 'AS', 'AC', 'KH'];
        const expectedCounts = { 'A': 4, 'K': 1 };
        const counts = rankCounts(hand);

        expect(counts).toEqual(expectedCounts);
    });

    test('handles a hand with full house', () => {
        const hand = ['2H', '2D', '2S', '5C', '5D'];
        const expectedCounts = { '2': 3, '5': 2 };
        const counts = rankCounts(hand);
        expect(counts).toEqual(expectedCounts);
    })
});

describe('sortHandByRank function', () => {
    test('sorts a hand by rank', () => {
        const hand = ['2H', '3D', '2S', '5C', '2D'];
        const expectedHand = ['2H', '2S', '2D', '3D', '5C'];
        const sortedHand = sortHandByRank(hand);
        expect(sortedHand).toEqual(expectedHand);
    })
    test('sorts a hand with 4 of a kind', () => {
        const hand = ['AH', 'AD', 'AS', 'AC', 'KH'];
        const expectedHand = ['KH', 'AH', 'AD', 'AS', 'AC'];
        const sortedHand = sortHandByRank(hand);
        expect(sortedHand).toEqual(expectedHand);
    })
})
