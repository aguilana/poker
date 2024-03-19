/**
 * SUMMARY:
 * This function (`createDeck`) creates a deck of 52 cards and returns it
 
 * @returns {string[]} - a deck of 52 cards
 */
function createDeck() {
    const suits = ['H', 'D', 'C', 'S'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    const deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push(value + suit);
        }
    }

    return deck;
}

/**
 * SUMMARY:
 * This function (`shuffleDeck`) takes a deck of 52 cards and shuffles the deck of 52 cards
 * using the Fisher-Yates shuffle algorithm
 
 * @param {string[]} deck  - a deck of 52 cards
 * @returns {string[]} - a shuffled deck of 52 cards
 */
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap
    }
}

/**
 * SUMMARY:
 * This function (`drawCards`) takes a deck of 52 cards and returns an array of `numCards` cards drawn from the deck
 
 * @param {string[]} deck - a deck of 52 cards
 * @param {number} numCards - number of cards to draw
 * @returns {string[]} - an array of `numCards` cards drawn from the deck
 */
function drawCards(deck, numCards = 5) {
    return deck.splice(0, numCards);
}

/**
 * SUMMARY:
 * This function (`dealCards`) takes a deck of 52 cards and returns an array of `numPlayers` hands of `numCardsPerPlayer (5 by default)` cards each drawn from the deck
 
 * 
 * @param {string[]} deck - a deck of 52 cards
 * @param {number} numPlayers - number of players
 * @param {number} numCardsPerPlayer - number of cards per player (5 by default for 5 card poker)
 * @returns 
 */
function dealCards(deck, numPlayers, numCardsPerPlayer = 5) {
    if (numPlayers > 8 || numPlayers < 2) {
        throw new Error('Number of players must be between 2 and 8 for 5 card poker');
    }
    // Initialize hands for each player
    const hands = Array.from({ length: numPlayers }, () => []);

    for (let card = 0; card < numCardsPerPlayer; card++) {
        for (let player = 0; player < numPlayers; player++) {
            // Draw the top card from the deck and assign it to the current player's hand
            hands[player].push(deck.shift());
        }
    }

    return hands;
}

function createShuffledDeckAndDraw() {
    let deck = createDeck();
    shuffleDeck(deck);
    const hand = drawCards(deck);
    deck = deck.filter(card => !hand.includes(card));
    return { hand, deck };
}

/**
 * SUMMARY:
 * This list of functions (`createDeck`, `shuffleDeck`, `drawCards`, and `dealCards`) creates a deck of 52 cards, shuffles the deck, and returns the deck and hands of 5 cards each
 */
const deck = createDeck(); // Create a new deck of cards
shuffleDeck(deck); // Shuffle the deck

module.exports = { createDeck, shuffleDeck, drawCards, dealCards, createShuffledDeckAndDraw }
