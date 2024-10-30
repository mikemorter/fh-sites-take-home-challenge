class PokerHand {
  constructor(cards) {
    // Check to see if the hand is a string and then split into individual values
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
    let joinedOccurances = rankOccurances.join("");

    // Poker hand rankings
    if (values.sort().join("") === "10AJKQ" && this.isFlush())
      return "Royal Flush";
    if (this.isStraight(sortedValues) && this.isFlush())
      return "Straight Flush";
    if (this.isStraight(sortedValues)) return "Straight";
    if (this.isFlush()) return "Flush";
    if (joinedOccurances === "1112") return "One Pair";
    if (joinedOccurances === "122") return "Two Pair";
    if (joinedOccurances === "113") return "Three of a Kind";
    if (joinedOccurances === "23") return "Full House";
    if (joinedOccurances === "14") return "Four of a Kind";
    return "High Card";
  }

  // Check occurrence of each facecard
  cardOccurrence(values) {
    const occurrences = {};
    values.forEach((value) => {
      occurrences[value] = (occurrences[value] || 0) + 1;
    });
    return Object.values(occurrences).sort((a, b) => a - b);
  }

  // Separate the values and suits
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
  // Check to see if values are sequential with edge cases
  isStraight(sortedValues) {
    const faceCardValues = {
      A: 14,
      K: 13,
      Q: 12,
      J: 11,
      10: 10,
      9: 9,
      8: 8,
      7: 7,
      6: 6,
      5: 5,
      4: 4,
      3: 3,
      2: 2,
    };

    // Map values to numbers, handling special cases
    const numberValues = sortedValues.map(
      (value) => faceCardValues[value] || parseInt(value)
    );
    numberValues.sort((a, b) => a - b);

    // Check for the Ace-low straight
    if (JSON.stringify(numberValues) === JSON.stringify([2, 3, 4, 5, 14])) {
      return true;
    }

    // Check for consecutive values
    for (let i = 1; i < numberValues.length; i++) {
      if (numberValues[i] - numberValues[i - 1] !== 1) {
        return false;
      }
    }
    return true;
  }
}

module.exports = PokerHand;
