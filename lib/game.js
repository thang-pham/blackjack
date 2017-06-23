// Represents a blackjack game
class Game {
    constructor() {
        this.deck = new Deck();
        this.players = [];

        // Assign a dealer automatically
        this.dealer = new Dealer("Dealer");
        this.dealer.set_deck(this.deck);
    }

    // Save the game
    save() {
        var data = JSON.stringify(this);
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "game.json");
    }

    // Load an existing game
    load(data) {
        this.deck = new Deck(data.deck.deck_id);

        this.dealer = new Dealer("Dealer");
        this.dealer.set_deck(this.deck);

        // Load each player's bet and bank
        for (var p = 0; p < data.players.length; p++) {
            var player = new Player(data.players[p].name);
            player.bet = data.players[p].bet;
            player.bank = data.players[p].bank;
            this.players.push(player);
        }
    }

    // Add a new player
    add_player(p) {
        this.players.push(p);
    }

    next_round() {
        // Play the next round
        this.dealer.empty_hand();

        // Reshuffle the deck
        this.deck.shuffle();

        // Draw card for dealer
        this.dealer.deal_self();

        // Draw cards for each player
        for (var i in this.players) {
            this.players[i].empty_hand();

            // Deal two cards to each player
            this.dealer.deal(this.players[i]);
            this.dealer.deal(this.players[i]);
        }
    }

    end_round(reason) {
        // Dealer now plays (just have to beat the player)
        this.dealer.play(reason);

        // Determine if dealer beat the player
        var state_text = "";
        var dealer_total = this.dealer.hands[0].total();
        if (dealer_total > 21) {
            this.dealer.state[0] = "LOST";
            for (var i in this.players) {
                var _player = this.players[i];

                for (var h in _player.hands) {
                    if (_player.state[h] != "LOST") {
                        // If the player did not already lose, then he won
                        _player.state[h] = "WON";
                    }
                }

                this.payout(_player);
            }
        } else {
            for (var i in this.players) {
                var _player = this.players[i];

                for (var h in _player.hands) {
                    var player_total = _player.hands[h].total();
                    if (player_total > dealer_total && player_total <= 21) {
                        _player.state[h] = "WON";
                    } else if (player_total == dealer_total) {
                        _player.state[h] = "TIED";
                    } else {
                        _player.state[h] = "LOST";
                    }
                }

                this.payout(_player);
            }
        }
    }

    payout(_player) {
        // Payout money based on what was bet
        for (var h in _player.hands) {
            var old_bank = _player.bank;
            if (_player.state[h] == "WON") {
                _player.bank += _player.bet;
            } else if (_player.state[h] == "TIED") {
                _player.bank += 0;
            } else {
                _player.bank -= _player.bet;
            }

            $("#debug").append("<p>" + _player.name + " >> " +
                _player.state[h] + " - Bank: " + old_bank + " --> " + _player.bank + "</p>");
        }
    }

    get string() {
        return JSON.stringify(this);
    }
}
