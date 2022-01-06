var assert = require('assert');
var PokerHand = require('../pokerHand.js');

// test Royal Flush

describe('Rank a Royal Flush', function() {
  it('Return royal flush when hand given', function() {
    var hand = new PokerHand('As Ks Qs Js 10s');
    assert.equal(hand.getRank(), 'Royal Flush');
  });
});

// test Pair

describe('Rank a Pair', function() {
  it('Return one pair when hand given', function() {
    var hand = new PokerHand('Ah As 10c 7d 6s');
    assert.equal(hand.getRank(), 'One Pair');
  });
});

// test Two Pair

describe('Rank Two Pair', function() {
  it('Return two pair when hand given', function() {
    var hand = new PokerHand('Kh Kc 3s 3h 2d');
    assert.equal(hand.getRank(), 'Two Pair');
  });
});

// test Flush

describe('Rank A Flush', function() {
  var hand = new PokerHand('Kh Qh 6h 2h 9h');
  it('Return flush when hand given', function() {
    assert.equal(hand.getRank(), 'Flush');
  });
});

// More tests go here

// test Three of a Kind

describe('Rank Three of a Kind', function() {
  it('Return three of a kind when hand given', function() {
    var hand = new PokerHand('Ac Ah As 5c Qh');
    assert.equal(hand.getRank(), 'Three of a Kind')
  })
})

// test Four of a Kind

describe('Rank Four of a Kind', function() {
  it('Return four of a kind when hand given', function() {
    var hand = new PokerHand('Ac Ah As AD Qh');
    assert.equal(hand.getRank(), 'Four of a Kind')
  })
})

// test Full House

describe('Rank Full House', function() {
  it('Return full house when hand given', function() {
    var hand = new PokerHand('Ac Ah As 5c 5d');
    assert.equal(hand.getRank(), 'Full House')
  })
})

// test Straight

describe('Rank Straight', function() {
  it('Return a straight when hand given', function() {
    var hand = new PokerHand('3c 4h 6d 5s 7h');
    assert.equal(hand.getRank(), 'Straight')
  })
})

// test Straight Flush

describe('Rank Straight Flush', function() {
  it('Return straight flush when hand given', function() {
    var hand = new PokerHand('2s 3s 4s 6s 5s');
    assert.equal(hand.getRank(), 'Straight Flush')
  })
})

// test High Card

describe('Rank High Card', function() {
  it('Return high card when hand given', function() {
    var hand = new PokerHand('Ac Qc 3d 5c 9s');
    assert.equal(hand.getRank(), 'High Card')
  })
})

// test Short Input Hand

describe('Short Input Hand', function() {
  it('Return not a valid hand when short hand given', function() {
    var hand = new PokerHand('2s Jd 4s 6s');
    assert.equal(hand.getRank(), 'Not a Valid Hand')
  })
})

// test Long Input Hand

describe('Long Input Hand', function() {
  it('Return not a valid hand when long hand given', function() {
    var hand = new PokerHand('2s Jd 4s 6s Qd Ks');
    assert.equal(hand.getRank(), 'Not a Valid Hand')
  })
})

// test Incorrect Input

describe('Handle incorrect input', function() {
  it('Return not a valid hand when incorrect string given', function() {
    var hand = new PokerHand('5h6h9s2h');
    assert.equal(hand.getRank(), 'Not a Valid Hand');
  });
});