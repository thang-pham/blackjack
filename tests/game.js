QUnit.test("game.constructor", function(assert) {
    var game = new Game();
    assert.ok(game.deck != null, "Game has an deck");
    assert.equal(0, game.players.length, "Game does not have players yet");
});

QUnit.test("game.add_player", function(assert) {
    var game = new Game();
    assert.equal(0, game.players.length, "Game does not have players yet");

    var player = new Player("Bot");
    game.add_player(player);
    assert.equal(player, game.players[0], "Game has correct player");
});

QUnit.test("game.next_round", function(assert) {
    var game = new Game();
    var player = new Player("Bot");
    game.add_player(player);
    game.next_round();

    assert.equal(1, game.players.length, "Game has one player");

    // Each player has 2 cards
    assert.equal(2, game.players[0].hands[0].cards.length, "Next round - each player has 2 cards");

    // Dealer has one card
    assert.equal(1, game.dealer.hands[0].cards.length, "Next round - dealer has one card");
});

QUnit.test("game.end_round", function(assert) {
    var game = new Game();
    var player = new Player("Bot");
    game.add_player(player);

    assert.equal(1, game.players.length, "Game has one player");

    // Player won
    game.dealer.hands[0].cards = [{"value": "7"}, {"value": "10"}];
    player.hands[0].cards = [{"value": "10"}, {"value": "10"}];
    player.state = []
    game.end_round();

    assert.equal("WON", player.state[0], "Player won - 20 vs. 17");

    // Player lost
    game.dealer.hands[0].cards = [{"value": "7"}, {"value": "10"}];
    player.hands[0].cards = [{"value": "10"}, {"value": "10"}, {"value": "3"}];
    player.state = []
    game.end_round();

    assert.equal("LOST", player.state[0], "Player lost - 23 vs. 17");

    // Dealer lost
    game.dealer.hands[0].cards = [{"value": "7"}, {"value": "7"}, {"value": "10"}];
    player.hands[0].cards = [{"value": "10"}, {"value": "10"}];
    player.state = []
    game.end_round();

    assert.equal("LOST", game.dealer.state, "Dealer busted - 24");
    assert.equal("WON", player.state[0], "Dealer busted and player won");
});

QUnit.test("game.payout", function(assert) {
    var game = new Game();
    var player = new Player("Bot");
    player.bank = 10;
    player.bet = 5;
    game.add_player(player);

    // Player won
    player.state = ["WON"]
    game.payout(player);
    assert.equal(15, player.bank, "Player is paid out");
});
