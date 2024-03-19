const { cardValue } = require('./cardValue.js')
const { rankCounts } = require('./handRank.utils.js')
/**
 * SUMMARY: 
 * These functions below check if the hand is true/false for each hand rank
 
 * @param {string[]} hand 
 * @returns {boolean} - true or false depending on whether the hand is abiding to the rules of poker
 */
////////////// HAND RANK //////////////////
////////////// 1. Royal Flush /////////////
///////////////////////////////////////////
function isRoyalFlush(hand) {
    if (hand.length !== 5) return false
    return isFlush(hand) && isStraight(hand) && hand[0][0] === 'T'
}

////////////// HAND RANK //////////////////
////////////// 2. Straight Flush //////////
///////////////////////////////////////////
function isStraightFlush(hand) {
    if (hand.length !== 5) return false
    return isFlush(hand) && isStraight(hand)
}

////////////// HAND RANK //////////////////
////////////// 3. Four of a Kind //////////
///////////////////////////////////////////
function isFourOfAKind(hand) {
    if (hand.length !== 5) return false
    const counts = rankCounts(hand);
    return Object.values(counts).includes(4);
}

////////////// HAND RANK //////////////////
////////////// 4. Full House //////////////
///////////////////////////////////////////
function isFullHouse(hand) {
    if (hand.length !== 5) return false
    const counts = rankCounts(hand);
    const values = Object.values(counts);
    return values.includes(3) && values.includes(2);
}

////////////// HAND RANK //////////////////
////////////// 5. Flush ///////////////////
///////////////////////////////////////////
function isFlush(hand) {
    if (hand.length !== 5) return false
    return hand.every(card => card[1] === hand[0][1])
}

////////////// HAND RANK //////////////////
////////////// 6. Straight ////////////////
///////////////////////////////////////////

function isSteelWheel(hand) {
    // Helper function to check for A, 2, 3, 4, 5 low-straight
    const values = hand.map(card => card[0]);
    const required = ['A', '2', '3', '4', '5'];
    return required.every(value => values.includes(value));
}

function isStraight(hand) {
    if (hand.length !== 5) return false
    if (isSteelWheel(hand)) return true;
    return hand.every((card, i) => i === 0 || cardValue(card) === cardValue(hand[i - 1]) + 1)
}

////////////// HAND RANK //////////////////
////////////// 7. Three of a Kind /////////
///////////////////////////////////////////
function isThreeOfAKind(hand) {
    if (hand.length !== 5) return false
    const counts = rankCounts(hand);
    return Object.values(counts).includes(3);
}

////////////// HAND RANK //////////////////
////////////// 8. Two Pairs ////////////////
///////////////////////////////////////////
function isTwoPair(hand) {
    if (hand.length !== 5) return false
    const counts = rankCounts(hand);
    const values = Object.values(counts);
    return values.filter(value => value === 2).length === 2;
}

////////////// HAND RANK //////////////////
////////////// 9. One Pair ////////////////
///////////////////////////////////////////
function isOnePair(hand) {
    if (hand.length !== 5) return false
    const counts = rankCounts(hand);
    return Object.values(counts).includes(2);
}

////////////// HAND RANK //////////////////
////////////// 10. High Card //////////////
///////////////////////////////////////////
function isHighCard(hand) {
    if (hand.length !== 5) return false
    return true;
}

module.exports = { isRoyalFlush, isStraightFlush, isFourOfAKind, isFullHouse, isFlush, isStraight, isThreeOfAKind, isTwoPair, isOnePair, isHighCard }