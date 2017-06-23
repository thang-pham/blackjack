// Represents a card deck
class Deck {
    constructor(deck_id) {
        this.deck_id = deck_id;

        if (deck_id == null) {
            // Create a new deck
            this._new_deck();
        }
    }

    _new_deck() {
        // Creates a new card deck
        var _deck_id = null;

        // Synchronous call to create new deck
        $.ajax({
            url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6",
            type: "GET",
            async: false,
            success: function(data) {
                _deck_id = data["deck_id"];
            },
            error: function() {
                console.log("Failed to create a new deck");
                throw new RequestException("Failed to create a new deck");
            }
        });

        this.deck_id = _deck_id;
        return this.deck_id;
    }

    draw(count) {
        // Draw a specified number of cards from the desk
        var cards = [];

        $.ajax({
            url: "https://deckofcardsapi.com/api/deck/" + this.deck_id + "/draw/?count=" + count,
            type: "GET",
            async: false,
            success: function(data) {
                cards = data["cards"];
            },
            error: function() {
                console.log("Failed to draw a card");
                throw new RequestException("Failed to draw a card");
            }
        });

        return cards;
    }

    shuffle() {
        // Shuffle the deck
        $.ajax({
            url: "https://deckofcardsapi.com/api/deck/" + this.deck_id + "/shuffle/",
            type: "GET",
            async: false,
            error: function() {
                console.log("Failed to shuffle the deck");
                throw new RequestException("Failed to shuffle the deck");
            }
        });
    }

    add_to_pile(name, cards) {
        // Add drawn cards to a pile
        $.ajax({
            url: "https://deckofcardsapi.com/api/deck/" + this.deck_id + "/pile/" + name + "/add/?cards=" + cards,
            type: "GET",
            async: false,
            error: function() {
                console.log("Failed to save cards to pile");
                throw new RequestException("Failed to save cards to pile");
            }
        });
    }

    draw_from_pile(name, desired_cards) {
        // Draw cards from a pile
        var cards = [];

        var url = "https://deckofcardsapi.com/api/deck/" + this.deck_id + "/draw/" + name + "/draw/";
        if (desired_cards) {
            // cards must by a list, e.g. 1H,2S,3D
            url = url + "?cards=" + desired_cards;
        }

        $.ajax({
            url: "https://deckofcardsapi.com/api/deck/" + this.deck_id + "/draw/" + name + "/draw/",
            type: "GET",
            async: false,
            success: function(data) {
                cards = data["cards"];
            },
            error: function() {
                console.log("Failed to draw cards from pile");
                throw new RequestException("Failed to draw cards from pile");
            }
        });

        return cards;
    }
}
