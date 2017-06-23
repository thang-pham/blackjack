QUnit.test("dealer.constructor", function(assert) {
    var dealer = new Dealer("Dealer");
    assert.equal("Dealer", dealer.name, "Dealer name is set");
    assert.equal(null, dealer.deck, "Dealer's deck is null");
});

QUnit.test("dealer.set_deck", function(assert) {
    var dealer = new Dealer("Dealer");
    var deck = new Deck();
    dealer.set_deck(deck);
    assert.equal(deck, dealer.deck, "Dealer's deck is set");
});

QUnit.test("dealer.deal_self", function(assert) {
    var dealer = new Dealer("Dealer");
    var deck = new Deck();
    dealer.set_deck(deck);
    dealer.deal_self();

    assert.equal(1, dealer.hands[0].cards.length, "Dealer has 1 card in his hand");
});

QUnit.test("dealer.deal", function(assert) {
    var dealer = new Dealer("Dealer");
    var player = new Player("Bot");
    var deck = new Deck();
    dealer.set_deck(deck);
    dealer.deal(player);

    assert.equal(1, player.hands[0].cards.length, "Dealer has dealt 1 card to a player");
});

QUnit.test("dealer.play", function(assert) {
    var dealer = new Dealer("Dealer");
    var deck = new Deck();
    dealer.set_deck(deck);
    dealer.deal_self();

    // If player has lost, dealer takes no action
    dealer.play(0);
    assert.equal(2, dealer.hands[0].cards.length, "Dealer only plays 1 card since player has lost");

    // Dealer plays to 17
    dealer.empty_hand();
    dealer.deal_self();
    dealer.play();
    assert.ok(dealer.hands[0].total() >= 17, "Dealer plays to 17");
    assert.ok(dealer.hands[0].cards.length >= 2, "Dealer has 2 or more cards in his hand");
});
