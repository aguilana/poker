const { Rank } = require('./Rank.js');
const { evaluatePokerHand } = require('./evaluatePokerHand.js');
const { cardValue } = require('./cardValue.js');

/**
 * 
 * @param {string[]} hand // the hand to evaluate ex) ['5H', '3D', '4S', '5C', '6D']
 * @param {string} highCardRank // the rank of the high card in the hand ex) '10H'
 * @returns 
 */

/**
 * getCombinations - Generate all combinations of a given length from an array. 
 * In this case, we are generating all possible redraw combinations for a hand after we mulligan some cards.
 * We can keep the deck ordered as it does not matter for this use case, all redraws are unique and we are not interested in the order of the cards.
 * 
 * @param {string[]} array 
 * @param {number} length 
 * @returns {string[][]}
 */
function getCombinations(sourceArray, combinationLength) {
  let allCombinations = [];

  function buildCombination(startIndex, currentCombination) {
    /**** BASE CASE ****/
    // If the combination is complete, add it to the list and return
    if (currentCombination.length === combinationLength) {
      allCombinations.push(currentCombination);
      return;
    }

    // If we've considered all elements, end this branch of recursion
    if (startIndex >= sourceArray.length) return;

    // Include the current element and move to the next
    buildCombination(startIndex + 1, currentCombination.concat(sourceArray[startIndex]));

    // Exclude the current element and move to the next
    buildCombination(startIndex + 1, currentCombination);
  }

  // Start building combinations from the first element with an empty combination
  buildCombination(0, []);

  // Return the list of all combinations
  return allCombinations;
}


// Evaluate the probability of improving a high card hand
function runMulliganHandImprovementProbability(evalHand, remainingCardsInDeck, cardsToMulligan) {

  let improvements = 0;

  let redrawCombinations = getCombinations(remainingCardsInDeck, cardsToMulligan.length);

  redrawCombinations.forEach(redraw => {
    let newHand = [...evalHand.cardsToKeep, ...redraw];
    let improved = false;



    switch (evalHand.handRankName) {

      case Rank.FOUR_OF_A_KIND.name:
        /**
         * evaluate if the hand is improved from redraw with evalHand fn
         * return an object with the rank of the hand and the cards to keep { handRankName: Rank.name, cardsToKeep: string[] }
         */

        const newFourKindHand = evaluatePokerHand(newHand);
        if (newFourKindHand.rank > evalHand.rank) improved = true;
        else if (newFourKindHand.rank === evalHand.rank) {
          // need to find the kicker of the new hand and compare to kicker of original hand
          let newKicker = newHand.find(card => !evalHand.cardsToKeep.includes(card));
          let originalKicker = cardsToMulligan.length > 0 ? cardsToMulligan[0] : null
          if (originalKicker && cardValue(newKicker) > cardValue(originalKicker)) {
            improved = true;
          }
        }
        break;

      case Rank.THREE_OF_A_KIND.name:
        const newThreeKindHand = evaluatePokerHand(newHand);
        if (newThreeKindHand.rank > evalHand.rank) improved = true;
        break;

      case Rank.TWO_PAIR.name:

        /* 
        *** mulligan 1 card with a two pair, so we will evaluate the new hand with the 4 cards we kept
        *** better than 2 pairs is full house, or a higher kicker for the two pairs
        */

        const newTwoPairHand = evaluatePokerHand(newHand);
        if (newTwoPairHand.rank > evalHand.rank) {
          improved = true
        } else if (newTwoPairHand.rank === evalHand.rank) {
          // if the new hand has the same rank as the original hand, we need to check the kickers
          // we keep the two pairs and the kicker, and we need to check if the new kicker is higher than the original kicker
          let newKicker = newHand.find(card => !evalHand.cardsToKeep.includes(card));
          let originalKicker = cardsToMulligan[0]
          if (cardValue(newKicker) > cardValue(originalKicker)) {
            improved = true;
          }
        }
        break;
      case Rank.ONE_PAIR.name:
        // evaluate if the hand is improved from redraw with evalHand fn
        // with a one pair we typically mulligan 3 cards, so we need to evaluate the new hand with the 2 cards we kept
        // ex) original hand = ['5H', '3D', '4S', '5C', '6D'], rankName = one pair; cardsToKeep = ['5H', '5C']
        // redraw combination = ['2H', 'AH', 'AC']
        // new hand = ['5H', '5C', '2H', 'AH', 'AC']
        // FN: const newHandEval = evaluatePokerHand(newHand) => { handRankName: Rank.TWO_PAIR.name, cardsToKeep: ['5H', '5C', '2H', 'AH'] }
        // if the new hand is better than the original hand, we increment the improvements counter
        // if newHandEval.rank < evalHand.rank, we increment the improvements counter
        // return an object with the rank of the hand and the cards to keep { handRankName: Rank.name, cardsToKeep: string[] }
        const newOnePairHand = evaluatePokerHand(newHand);
        if (newOnePairHand.rank > evalHand.rank) {
          improved = true
        };
        break;

      /**
       * *** mulligan 4 cards with a high card, so we will evaluate the new hand with the 1 card we kept
       */

      case Rank.HIGH_CARD.name:
        const newHighCardHand = evaluatePokerHand(newHand);
        if (newHighCardHand.rank > evalHand.rank) improved = true;
        else if (newHighCardHand.rank === evalHand.rank) {
          // find the highest ranked card in the new hand and then it is stronger
          for (let card of newHand) {
            if (cardValue(card) > cardValue(evalHand.cardsToKeep[0])) {
              improved = true;
              break;
            }
          }
        }
        break;
      default:
        break;
    }
    if (improved) {
      improvements++;
    }
  }
  );

  // console.log("Number of improved hands: ", improvements);
  // console.log("Total redraw combinations: ", redrawCombinations.length);
  // console.log("Probability of improvement: ", improvements / redrawCombinations.length);
  const percentage = (improvements / redrawCombinations.length).toFixed(2);

  return Number(percentage);

}

module.exports = { runMulliganHandImprovementProbability }