const { cardValue } = require('./cardValue.js');
const { rankCounts } = require('./handRank.utils.js');
const { isRoyalFlush, isStraightFlush, isFourOfAKind, isFullHouse, isFlush, isStraight, isThreeOfAKind, isTwoPair, isOnePair } = require('./handRanks.js');
const { Rank } = require('./Rank.js');


/**
 * Takes a hand of 5 cards and returns the rank of the hand, based on poker ranks, and hypothetical cards to keep
 * @param {string[]} hand 
 * @returns {object} - an object with the rank of the hand and the cards to keep { rank: Rank, cardsToKeep: string[] }
 */


function evaluatePokerHand(hand) {
    // TODO different hands in poker that we need to evaluate
    hand.sort((a, b) => cardValue(a) - cardValue(b));
    const counts = rankCounts(hand);
    if (isRoyalFlush(hand)) return { handRankName: Rank.ROYAL_FLUSH.name, cardsToKeep: hand, rank: Rank.ROYAL_FLUSH.rank };
    else if (isStraightFlush(hand)) return { handRankName: Rank.STRAIGHT_FLUSH.name, cardsToKeep: hand, rank: Rank.STRAIGHT_FLUSH.rank };
    else if (isFourOfAKind(hand)) {

        const fourCardsToKeep = hand.filter(card => counts[card[0]] === 4);
        const kicker = hand.find(card => !fourCardsToKeep.includes(card));
        const kickerValue = cardValue(kicker);

        if (kickerValue > 13) return { handRankName: Rank.FOUR_OF_A_KIND.name, cardsToKeep: hand, rank: Rank.FOUR_OF_A_KIND.rank };
        else return { handRankName: Rank.FOUR_OF_A_KIND.name, cardsToKeep: hand.filter(card => counts[card[0]] === 4), rank: Rank.FOUR_OF_A_KIND.rank };
    }
    else if (isFullHouse(hand)) return { handRankName: Rank.FULL_HOUSE.name, cardsToKeep: hand, rank: Rank.FULL_HOUSE.rank };
    else if (isFlush(hand)) return { handRankName: Rank.FLUSH.name, cardsToKeep: hand, rank: Rank.FLUSH.rank };
    else if (isStraight(hand)) return { handRankName: Rank.STRAIGHT.name, cardsToKeep: hand, rank: Rank.STRAIGHT.rank };
    else if (isThreeOfAKind(hand)) return { handRankName: Rank.THREE_OF_A_KIND.name, cardsToKeep: hand.filter(card => counts[card[0]] === 3), rank: Rank.THREE_OF_A_KIND.rank };
    else if (isTwoPair(hand)) return { handRankName: Rank.TWO_PAIR.name, cardsToKeep: hand.filter(card => counts[card[0]] === 2), rank: Rank.TWO_PAIR.rank };
    else if (isOnePair(hand)) return { handRankName: Rank.ONE_PAIR.name, cardsToKeep: hand.filter(card => counts[card[0]] === 2), rank: Rank.ONE_PAIR.rank };
    else return { handRankName: Rank.HIGH_CARD.name, cardsToKeep: [hand[hand.length - 1]], rank: Rank.HIGH_CARD.rank };

}

module.exports = {
    evaluatePokerHand
}