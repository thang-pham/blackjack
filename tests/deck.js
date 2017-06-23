QUnit.test("deck.constructor", function(assert) {
    var deck = new Deck();
    assert.ok(deck.deck_id != null, "Deck has a deck_id");
});

QUnit.test("deck.draw", function(assert) {
    var deck = new Deck();
    var cards = deck.draw(2);
    assert.equal(2, cards.length, "2 cards were drawn from the deck");
});

QUnit.test("deck.shuffle", function(assert) {
    var deck = new Deck();
    ok = true;
    try {
        deck.shuffle();
    } catch (e) {
        ok = false;
    }

    assert.ok(ok, "Deck shuffle worked");
});
