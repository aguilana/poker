
const { drawCards, createDeck, shuffleDeck, cardValue } = require('../utils');
const ranks = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "T": 10, "J": 11, "Q": 12, "K": 13, "A": 14 };
const deck = createDeck(); // Create a new deck of cards
shuffleDeck(deck);
const arrayOfCards = drawCards(deck, 15);


describe('cardValue function', () => {
    arrayOfCards.forEach((card, i) => {
        test(`should return ${ranks[card[0]]} for ${card}`, () => {
            expect(cardValue(card)).toBe(ranks[card[0]]);
        });
    });
});