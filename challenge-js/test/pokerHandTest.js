var assert = require('assert')
var PokerHand = require('../pokerHand.js')

describe('Rank a Royal Flush', function() {
  it('Return royal flush when hand given', function() {
    var hand = new PokerHand('Ks As Js Qs 10s')
    assert.equal(hand.getRank(), 'Royal Flush')
  })
})

describe('Rank a Straight Flush', function () {
  it('Return straight flush when hand given', function () {
    var hand = new PokerHand('Ks Qs Js 10s 9s')
    assert.equal(hand.getRank(), 'Straight Flush')
  })
})

describe('Rank Four of a Kind', function () {
  it('Return four of a kind when hand given', function () {
    var hand = new PokerHand('Ks Kc Kh Kd 9s')
    assert.equal(hand.getRank(), 'Four of a Kind')
  })
})

describe('Rank a Full House', function () {
  it('Return full house when hand given', function () {
    var hand = new PokerHand('Ks Kc Qh Qd Qs')
    assert.equal(hand.getRank(), 'Full House')
  })
})

describe('Rank a Flush', function () {
  it('Return flush when hand given', function () {
    var hand = new PokerHand('Ks Qs Js 8s Qs')
    assert.equal(hand.getRank(), 'Flush')
  })
})

describe('Rank a Straight', function () {
  it('Return straight when hand given', function () {
    var hand = new PokerHand('9s 7c 5h 8d 6s')
    assert.equal(hand.getRank(), 'Straight')
  })
})

describe('Rank Three of a Kind', function () {
  it('Return three of a kind when hand given', function () {
    var hand = new PokerHand('Kh Kc Ks 3h 2d')
    assert.equal(hand.getRank(), 'Three of a Kind')
  })
})

describe('Rank Two Pair', function () {
  it('Return two pair when hand given', function () {
    var hand = new PokerHand('Kh Kc 3s 3h 2d')

    assert.equal(hand.getRank(), 'Two Pair')
  })
})

describe('Rank a Pair', function() {
  it('Return one pair when hand given', function() {
    var hand = new PokerHand('Ah As 10c 7d 6s')

    assert.equal(hand.getRank(), 'One Pair')
  })
})

describe('Rank a High Card', function () {
  it('Return high card when hand given', function () {
    var hand = new PokerHand('Ah 3s 10c 7d 6s')

    assert.equal(hand.getRank(), 'High Card')
  })
})

