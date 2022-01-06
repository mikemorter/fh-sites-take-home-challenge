class PokerHand {
  constructor(cards) {
      // Is hand submitted a string then split individual values
      this.cardsArray = typeof cards === 'string' ? cards.split(" ") : null;
      console.log(this.cardsArray);
  }

  // Get card values
  
  getCardValues(cards, prop){
      let cardValues = cards.map((card)=>{
        if( prop === 'ranks' ){
          let value = card.length === 3 ? card.slice(0,2) : card[0];
          return value;
        }
        if( prop === 'suits' ){
          let value = card.length === 3 ? card.slice(2) : card[1];
          return value;
        }
    });
    return cardValues;
  }

// Get occurnce of each card

  cardOccurrence(values){
    let a = [], b = [], prev;
    values.sort();
    for( let i = 0; i < values.length; i++ ) {
      if ( values[i] !== prev ) {
        a.push(values[i]);
        b.push(1);
      } else {
        b[b.length-1]++;
      }
        prev = values[i];
    } 
    return [a, b];
  }

// Implement way to find flush

  flush(){
    let suits = this.getCardValues(this.cardsArray, 'suits');
    let filteredSuits = suits.filter(function(item, pos) {
      return suits.indexOf(item) === pos;
    })
    
    return filteredSuits.length === 1 ? true : false;
  }

// Implement way to find straight

  straight(arr){
    function isOneGreater(element, index, arr){
      return index === arr.length - 1 || parseInt(element, 10) + 1  === parseInt(arr[index + 1], 10);
    }
    return arr.every(isOneGreater);
  }

// Ranks

  getRank() {
    // result if none of other ranks are met
    let result = "High Card";

    // Not valid hand
    if( this.cardsArray.length !== 5 || this.cardsArray === null ){
        return "Not a Valid Hand";
    }
    
    let ranks = this.getCardValues(this.cardsArray, 'ranks');
    let rankOccurances = this.cardOccurrence(ranks);

    // Poker hand rankings
    switch(rankOccurances[1].sort().join('')){
        case '1112':
              result = "One Pair";
              break;
        case '122':
              result = "Two Pair";
              break;
        case "113":
              result = "Three of a Kind";
              break;
        case "23":
              result = "Full House";
              break;
        case "14":
              result = "Four of a Kind";
              break;
    }
    if( this.flush() ){
      result = "Flush";    
    } 
    if ( this.straight(ranks.sort()) ){
      result = "Straight";      
    }
    if ( this.straight(ranks.sort()) && this.flush() ){
      result = "Straight Flush";      
    }
    if( ranks.sort().join('') === "10AJKQ"  && this.flush()){
      result = "Royal Flush";
    }
    return result;
  }
}

module.exports = PokerHand;
