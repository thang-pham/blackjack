QUnit.test("player.constructor", function(assert) {
    var player = new Player("Bot");
    assert.equal("Bot", player.name, "Player name is set");
    assert.equal(0, player.bank, "Player bank is 0");
    assert.equal(0, player.bet, "Player bet is 0");
    assert.equal(0, player.state.length, "Player state is empty");
    assert.equal(1, player.hands.length, "Player has one hand");
});

QUnit.test("player.new_hand", function(assert) {
    var player = new Player("Bot");
    player.hands = [];
    player.new_hand();
    assert.equal(1, player.hands.length, "Player has one hand");
    assert.equal(player.name, player.hands[0].owner, "Player has one hand with correct owner");
});

QUnit.test("player.add_to_hand", function(assert) {
    var player = new Player("Bot");
    var card = {"value": "ACE"};
    player.add_to_hand(card);
    assert.equal(card, player.hands[0].cards[0], "Player has correct card");
});

QUnit.test("player.empty_hand", function(assert) {
    var player = new Player("Bot");
    player.empty_hand();
    assert.equal(1, player.hands.length, "Player has 1 hand");
    assert.equal(0, player.state.length, "Player state is empty");
});

QUnit.test("player.split", function(assert) {
    var player = new Player("Bot");
    player.hands[0].cards = [{"value": "ACE"}, {"value": "ACE"}];
    player.split();
    assert.equal(2, player.hands.length, "Player has 2 hands");

    player.empty_hand();
    player.hands[0].cards = [{"value": "ACE"}, {"value": "8"}];

    assert.throws(
        function () {
            player.split()
        },
        function (e) {
            return e.message == 'You can only split on a pair of IDENTICAL cards!' },
        "Player can only split on identical cards"
    );
});
