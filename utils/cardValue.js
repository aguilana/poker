/**
 * SUMMARY:
 * This function returns the value of a card from the deck of 52 cards.
 * 
 * @param {string} card  - a card from the deck of 52 cards
 * example: '2H', '3D', '4S', '5H', '6C'
 * @returns {number} - the value of the card
 * example: 2, 3, 4, 5, 6
 * 
 */
function cardValue(card) {
    const ranks = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "T": 10, "J": 11, "Q": 12, "K": 13, "A": 14 };
    return ranks[card[0]];
}

module.exports = { cardValue }

