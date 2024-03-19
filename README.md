# FINAL

- In the index.js file you can test the optimized mulligan and probability of getting a better hand by running the following command:
  - `node index.js` or `npm run test`
- Running `npm run jest-test` will run the test cases in the `tests` folder

## ASSUMPTIONS

- With the directions saying "what is the optimal selection of cards to mulligan (discard and redraw)" we assume that top hands are not have no mulligan.
  - example: You draw a Royal Flush, Straight Flush, Full House, Flush, or Straight, then you should not mulligan as any redraw will not improve your hand. No optimal selection of cards to mulligan
- I assume that with no mulligan you have an optimal hand and that a mulligan will not improve your hand or very low chance.
  - example: You draw a straight [2S, 3D, 4D, 5C, 6H] the only chance to improve is to draw a higher straight, a flush, a royal straight or royal flush. Therefore is it NOT OPTIMAL to select cards to mulligan.
  - a full redraw of the hand is the only chance to improve the hand and the probability of getting a better hand is very low. (I did not run those numbers but they are poker probabilities)

## POKER HAND MULLIGAN AND PROBABILITY PROBLEM

1. Imagine you are given a deck of playing cards (a regular 52 card deck), which is shuffled face down.
2. Then you draw five cards off the top. That hand is a 5-card poker hand.
3. Now imagine you are allowed to place any number of your 5 cards back into the deck, shuffle the deck, and redraw that many cards for a chance at a better hand.

TASKS
Your task is to...
[x] - write a function which outputs the following information (in whatever format you desire):
[x] - what is the optimal selection of cards to mulligan (discard and redraw) (assuming there might NOT be optimal selection here if the hand is already strong)
[x] - what is the probability that the optimal mulligan will yield a stronger hand than originally drawn.

Note: Your work will be graded on clarity of thought, completion, efficiency, and correctness.
This is a tough problem, if you would prefer to use statistics rather than compute probabilities your answer will still be accepted, albeit "scored" lower (there are no real numeric scores, but you get it).

## THOUGHT PROCESS

- The problem is asking for the optimal selection of cards to mulligan (discard and redraw)
- The problem is also asking for the probability that the optimal mulligan will yield a stronger hand than originally drawn.

Steps:

1. Shuffle and draw top 5 cards from the deck
   - [x] for testing can right a function but can also hard code test cases
2. Determine what kind of hand you have (e.g. Royal Flush, Straight Flush, Four of a Kind, Full House, Flush, Straight, Three of a Kind, Two Pair, One Pair, High Card)

   - [x] right a function to determine the kind of hand

3. If you draw a Royal Flush, Straight Flush, Full House, Flush, or Straight, then you should not mulligan as any redraw will not improve your hand. No optimal selection of cards to mulligan

   - this assumes that the deck is shuffled and drawn randomly and probability of getting a better hand is near zero as you have maximized chance of a great hand.
     [x] RETURN: no array or empty array of mulligan cards due to strongest hand

4. If you have Three of a Kind, Two Pair, One Pair, or High Card, then you should mulligan the cards that are not part of the hand (e.g. if you have a pair of 2s, then you should mulligan the other 3 cards)

   - [x] RETURN: the cards to mulligan
   - [x] RETURN: probability of getting a better/stronger hand

5. Write a probability function that will do the following
   - [x] Takes 3 Params: evaluated hand, remaining cards in deck, cards to mulligan from hand
   - [x] function should get the combination of every possible hand that can be drawn from the remaining cards in the deck -- fn getCombinations()
     - [x] getCombinations should recursively get all possible combinations of 5 cards from the remaining cards in the deck
   - [x] function should re-evaluate the hand and determine if the hand's rank is better than the original hand. If it is, then it should be counted as an improved hand
   - [x] function should return the probability of getting a better hand by dividing the number of improved hands by the total number of possible hands
