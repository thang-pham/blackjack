QUnit.test("hand.constructor", function(assert) {
    var hand = new Hand("Bot");
    assert.equal("Bot", hand.owner, "Hand has an owner");
    assert.equal(0, hand.cards.length, "Hand has no cards");
});

QUnit.test("hand.append", function(assert) {
    var hand = new Hand("Bot");
    assert.equal(0, hand.cards.length, "Hand has no cards");

    var card = {"value": "ACE"};
    hand.append(card);
    assert.equal(card, hand.cards[0], "Hand has correct card");
});

QUnit.test("hand.total", function(assert) {
    var hand = new Hand("Bot");
    var ace_card = {"value": "ACE"};
    var three_card = {"value": "3"};
    hand.append(ace_card);
    hand.append(three_card);
    assert.equal(14, hand.total(), "Hand has correct total - ACE + 3 = 14");

    hand.cards = [];
    var ace_card = {"value": "ACE"};
    var ten_card = {"value": "10"};
    var nine_card = {"value": "9"};
    hand.append(ace_card);
    hand.append(ten_card);
    hand.append(nine_card);
    assert.equal(20, hand.total(), "Hand has correct total - ACE + 10 + 9 = 20");
});
