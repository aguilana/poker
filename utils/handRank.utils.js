const { Rank } = require('./Rank.js');
const { cardValue } = require('./cardValue.js')

function rankCounts(hand) {
    const counts = {};
    hand.forEach(card => {
        const value = card[0];
        counts[value] = counts[value] ? counts[value] + 1 : 1;
    });
    return counts;
}

function sortHandByRank(hand) {
    return hand.slice().sort((a, b) => cardValue(a) - cardValue(b));
}



module.exports = { rankCounts, sortHandByRank }