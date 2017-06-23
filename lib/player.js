// Represents a player
class Player {
    constructor(name) {
        this.hands = [];
        this.bank = 0;  // How much is in the bank
        this.bet = 0;   // How much to bet in the round
        this.name = name;   // No spaces
        this.state = [];  // WON, LOST, or TIED (index matches hand)

        this.new_hand();
    }

    new_hand() {
        var hand = new Hand(this.name);
        this.hands.push(hand);
        return hand;
    }

    add_to_hand(card, h) {
        // Usually there is only one hand, but in the case of split, you
        // can have multiple hands
        if (h == null) {
            h = 0;
        }

        this.hands[h].append(card);
    }

    empty_hand() {
        // Empty the player's hand
        this.hands = [];
        this.new_hand();
        this.state = [];
    }

    split() {
        // Only allow one split
        var cards = this.hands[0].cards;
        if (cards[0].value == cards[1].value) {
            var new_hand = this.new_hand();
            new_hand.append(cards.pop());
        } else {
            throw new InvalidException("You can only split on a pair of IDENTICAL cards!")
        }
    }

    get string() {
        return JSON.stringify(this);
    }
}
