// Global variable to track the game
var game = null;
var player_index = 0;  // Human player (always 0)
var hand_in_play = 0;  // Which hand is in play?


function new_game(bank, bet) {
    if ($("#bank").val() == "" || $("#bet").val() == "") {
        alert("Please place a bet and put money into your bank!");
        return;
    }

    // Create a new game
    game = new Game();

    var player = new Player("You");
    player.bank = parseInt($("#bank").val());
    player.bet = parseInt($("#bet").val());
    game.add_player(player);

    // TODO: Setup bot players
    $("#bank").attr("disabled", true);
    var deck_id = game.dealer.deck.deck_id;
    $("#info").append("Deck: " + deck_id);
    $("#info").show();
    next_round();
}


function reset_table() {
    // Reset the table for the next round
    $("#dealer").empty();
    $("#players").empty();
    $(".player-btn").attr("disabled", false);
}


function show_dealer_hand() {
    $("#dealers").empty();
    $("#dealers").append("<h4>Dealer</h4>" +
        "<div class='col-md-4' id='dealer'></div>");

    // Dealer only has one hand
    var cards = game.dealer.hands[0].cards;
    for (var c in cards) {
        $("#dealer").append("<img src=" + cards[c].image + " class='card-img rounded mx-auto d-block'>");
    }
}


function show_players_hand() {
    $("#players").empty();

    for (var i = 0; i < game.players.length; i++) {
        var name = game.players[i].name;
        $("#players").append("<h4>" + name + "</h4>");

        // Show each hand (at most 2)
        var hands = game.players[i].hands;
        for (var h in hands) {
            var id = name + "-hand" + h;
            $("#players").append("<div class='col-md-4' id=" + id + "></div>");

            var hand = game.players[i].hands[h];
            var cards = hand.cards;
            for (var c = 0; c < cards.length; c++) {
                $("#" + id).append("<img src=" + cards[c].image + " class='card-img rounded mx-auto d-block'>");
            }
        }
    }
}


function next_round() {
    if (game == null) {
        alert("Please start a game!");
        return
    }

    if (parseInt($("#bank").val()) <= 0) {
        alert("You are bankrupt!");
        $("#bank").attr("disabled", false);
        return;
    }

    if (parseInt($("#bet").val()) > parseInt($("#bank").val())) {
        alert("You do not have enough money!");
        return;
    }

    $("#dealers").empty();
    $("#players").empty();
    $("#debug").empty();

    $("#state").text("Choose your next move.");
    $("#state").attr("class", "alert alert-info")

    // Play the next round
    reset_table();
    game.dealer.empty_hand();

    // Update bet (if necessary)
    game.players[player_index].bet = parseInt($("#bet").val());

    game.next_round();
    hand_in_play = 0;
    show_dealer_hand();
    show_players_hand();

    // Don't do anything else if you have 21
    var player = game.players[player_index];
    var hand = player.hands[hand_in_play];
    if (hand.total() == 21) {
        end_round();
    }
}


function show_outcome() {
    var state_text = ""
    if (game.dealer.state[0] == "LOST") {
        state_text += "<p>Dealer LOST this round! Dealer: " + game.dealer.hands[0].total() + "</p>";
    } else {
        for (var i in game.players) {
            var _player = game.players[i];

            // Determine outcome for each hand
            for (var h in _player.hands) {
                var hand = _player.hands[h];
                if (_player.state[h] == "WON") {
                    state_text += "<p>" + h + ": " +
                        _player.name + " WON! Player: " + hand.total() +
                        " - Dealer: " + game.dealer.hands[0].total() + "</p>";
                } else if (_player.state[h] == "TIED") {
                    state_text += "<p>"  + h + ": " +
                        _player.name + " TIED! Player: " + hand.total() +
                        " - Dealer: " + game.dealer.hands[0].total() + "</p>";
                } else {
                    state_text += "<p>"  + h + ": " +
                        _player.name + " LOST! Player: " + hand.total() +
                        " - Dealer: " + game.dealer.hands[0].total() + "</p>";
                }
            }
        }
    }

    // Update bank account
    $("#bank").val(game.players[player_index].bank);

    $("#state").empty();
    $("#state").append(state_text)
}


function end_round(reason) {
    var hands = game.players[player_index].hands;
    if (hand_in_play < hands.length - 1) {
        // Go to the next hand
        hand_in_play++;

        show_dealer_hand();
        show_players_hand();
    } else {
        // All hands played - end round
        $(".player-btn").attr("disabled", true);

        game.end_round(reason);
        show_dealer_hand();
        show_players_hand();

        show_outcome();
    }
}


function hit() {
    // Player action - hit
    if (game == null) {
        alert("Please start a game!");
        return
    }

    // Dealer deals a card to the player
    var player = game.players[player_index];

    var hand = player.hands[hand_in_play];
    game.dealer.deal(player, hand_in_play);
    show_players_hand();

    if (hand.total() > 21) {
        // End round - you lost
        $("#state").text("Over 21 - You lose!");
        $("#state").attr("class", "alert alert-danger")

        end_round(0);  // 0 = hand total > 21
    } else if (hand.total() == 21) {
        $("#state").text("Blackjack - You win!");
        $("#state").attr("class", "alert alert-success")
        $(".player-btn").attr("disabled", true);

        end_round();
    }
}


function double_down() {
    // Double bet and hit once
    var new_bet = parseInt($("#bet").val()) * 2;
    game.players[player_index].bet = new_bet;

    hit();  // Only hit once
    end_round();
    $(".player-btn").attr("disabled", true);
}


function split() {
    // Split the current hand and play separately
    var player = game.players[player_index];

    try {
        player.split();
        show_players_hand();
    } catch (e) {
        alert(e.message);
    }
}


function save_game() {
    // Save the game
    if (game == null) {
        alert("Please start a game!");
        return
    }

    game.save();
}


function load_game() {
    var input = document.getElementById('upload-file');
    var file = input.files[0];

    var reader = new FileReader();
    reader.onload = function(e) {
        var data = JSON.parse(reader.result);

        game = new Game();
        game.load(data);
        player = data.players[0];

        // Index 0 is always the human player
        $("#bet").val(data.players[0].bet);
        $("#bank").val(data.players[0].bank);

        var deck_id = game.dealer.deck.deck_id;
        $("#info").append("Deck: " + deck_id);
        $("#info").show();

        $("#state").text("Click Next to start the next round");
    }

    reader.readAsText(file);
}


function wire_up_controls() {
    // Game controls
    $("#new-game").click(function() {
        new_game();
    });

    $("#save-game").click(function() {
        save_game();
    });

    $("#load-game").click(function() {
        load_game();
    });

    $("#next-round").click(function() {
        next_round();
    });

    // Player controls
    $("#hit").click(function() {
        hit();
    });

    $("#double").click(function() {
        double_down();
    });

    $("#split").click(function() {
        split();
    });

    $("#stay").click(function() {
        end_round();
    });

    // Allow saved game to be uploaded
    $("#load").click(function() {
        $("#upload-file").click();
    });
    $("#upload-file").change(function() {
        load_game();
    });
}


$("#info").hide();
wire_up_controls();
