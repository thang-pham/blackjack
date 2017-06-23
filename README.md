# Blackjack
*A simple game of Blackjack - written purely in JavaScript.*

* What are the requirements?

  It is written entirely in JavaScript (with Bootstrap and jQuery)
  and leverages https://deckofcardsapi.com/. You only need a browser
  (with Internet access) to play the game - just open index.html in
  your browser.

* What are the rules of the game?

  The objective is to get as close to 21 as possible without going over.
  More info can be found at http://www.bicyclecards.com/how-to-play/blackjack/.

  Please take note:

  - The dealer will hit if his hand is under 17, otherwise the dealer will stand.
  - You can only split an identical pair once.

* How do I play the game?

  Open index.html in the browser of your choice (e.g. Google Chrome
  or Firefox).

  1. Place your bet and set your bank account.
  2. Start the game by clicking on New.
  3. Choose the appropriate actions based on your hand (e.g. Double,
    Hit, Stand, or Split).
  4. Once the dealer plays and the outcome is determined (i.e. you
    won, lost, or tied), start the next round by clicking on Next.

  Your game can be saved by clicking Save. A JSON file will be
  downloaded to your local desktop. It will save your deck-id,
  current bet, and bank account. Your game can be loaded by clicking
  on Load. Here, you only need to locate the JSON file you originally
  saved.

* How do I run unit tests?

  Unit tests are written using QUnit (https://qunitjs.com/). To see
  the output, just open tests.html.
