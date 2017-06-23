// Represents a dealer
class Dealer extends Player {
    constructor(name) {
        super(name);
        this.deck = null;
    }

    set_deck(deck) {
        // Assign a deck to the dealer
        this.deck = deck;
    }

    deal_self() {
        // Deals a card to himself
        var card = this.deck.draw(1)[0];
        this.add_to_hand(card);
    }

    deal(player, h) {
        // Deal to the first hand if one is not specified
        if (h == null) {
            h = 0;
        }

        // Deals a card to a player
        var card = this.deck.draw(1)[0];
        player.add_to_hand(card, h);
    }

    play(reason) {
        // Dealer plays and ends the round
        if (reason == 0) {
            // Reason 0 means player > 21
            var card = this.deck.draw(1)[0];
            this.add_to_hand(card);
        } else {
            // If the dealer has 16 or less, then he will draw another card
            while (this.hands[0].total() < 17) {
                var card = this.deck.draw(1)[0];
                this.add_to_hand(card);
            }
        }
    }
}
