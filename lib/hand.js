// Represents a player's hand
class Hand {
    constructor(owner) {
        this.cards = []
        this.owner = owner;
    }

    // Appends a card to the hand
    append(card) {
        this.cards.push(card);
    }

    total() {
        // Calculate the optimal score
        // You lose if your hand is over 21
        var total = 0;
        var card_value = 0;
        var ace_count = 0;

        for (var i in this.cards) {
            card_value = this.cards[i].value;

            if (card_value == "ACE") {
                ace_count += 1;
            } else if (card_value == "JACK" || card_value == "QUEEN" || card_value == "KING") {
                total += 10;
            } else {
                total += parseInt(card_value);
            }
        }

        // Ace counts as 1 or 11. Calculate the optimal score.
        for (var a = 0; a < ace_count; a++) {
            if (total <= 10) {
                total += 11;
            } else {
                total += 1;
            }
        }

        // Debugging purposes only
        $("#debug").append("<p>" + this.owner + " >> ACE count: " + ace_count + " - Total: " + total + "</p>");
        return total;
    }
}
