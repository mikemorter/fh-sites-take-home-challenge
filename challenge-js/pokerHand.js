class PokerHand {
  constructor(cards) {
    // Is hand submitted a string then split individual values
    this.cardsArray = typeof cards === "string" ? cards.split(" ") : null;
  }

  getRank() {
    // Not valid hand
    if (this.cardsArray.length !== 5 || this.cardsArray === null) {
      return "Not a Valid Hand";
    }

    let values = this.parseHand(this.cardsArray, "values");
    let sortedValues = values.sort((a, b) => a - b);
    let rankOccurances = this.cardOccurrence(values);
    let sortedOccurances = rankOccurances.sort().join("");

    // Poker hand rankings
    if (values.sort().join("") === "10AJKQ" && this.isFlush())
      return "Royal Flush";
    if (this.isStraight(sortedValues) && this.isFlush())
      return "Straight Flush";
    if (this.isStraight(sortedValues)) return "Straight";
    if (this.isFlush()) return "Flush";
    if (sortedOccurances === "1112") return "One Pair";
    if (sortedOccurances === "122") return "Two Pair";
    if (sortedOccurances === "113") return "Three of a Kind";
    if (sortedOccurances === "23") return "Full House";
    if (sortedOccurances === "14") return "Four of a Kind";
    return "High Card";
  }

  // Get occurrence of each card

  cardOccurrence(values) {
    values.sort();
    let cardSuit = [];
    let prev;

    for (let i = 0; i < values.length; i++) {
      if (values[i] !== prev) {
        cardSuit.push(1);
      } else {
        cardSuit[cardSuit.length - 1]++;
      }
      prev = values[i];
    }
    return cardSuit;
  }

  // Get card values and suits
  parseHand(cards, prop) {
    let cardValues = cards.map((card) => {
      if (prop === "values") return card.slice(0, -1);
      if (prop === "suits") return card.slice(-1);
    });
    return cardValues;
  }

  isFlush() {
    let suits = this.parseHand(this.cardsArray, "suits");
    return new Set(suits).size === 1;
  }

  isStraight(sortedValues) {
    let valuesString = sortedValues.join("");
    if (
      valuesString === "109JKQ" ||
      valuesString === "10AJKQ" ||
      valuesString === "1089JQ" ||
      valuesString === "10789J"
    )
      return true;
    else
      for (let i = 1; i < sortedValues.length; i++) {
        if (sortedValues[i] - sortedValues[i - 1] !== 1) return false;
      }
    return true;
  }
}

module.exports = PokerHand;
