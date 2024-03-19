const Rank = {
    ROYAL_FLUSH: { name: "Royal Flush", rank: 10 },
    STRAIGHT_FLUSH: { name: "Straight Flush", rank: 9 },
    FOUR_OF_A_KIND: { name: "Four Of A Kind", rank: 8 },
    FULL_HOUSE: { name: "Full House", rank: 7 },
    FLUSH: { name: "Flush", rank: 6 },
    STRAIGHT: { name: "Straight", rank: 5 },
    THREE_OF_A_KIND: { name: "Three Of A Kind", rank: 4 },
    TWO_PAIR: { name: "Two Pair", rank: 3 },
    ONE_PAIR: { name: "One Pair", rank: 2 },
    HIGH_CARD: { name: "High Card", rank: 1 }
};

module.exports = {
    Rank
}