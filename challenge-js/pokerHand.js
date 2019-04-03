class PokerHand {
  constructor(handAsString) {
    //Ignoring key naming conventions here for simplicity
    this.possibleHands = {
      Royal_Flush: { has: null },
      Straight_Flush: { has: null },
      Four_of_a_Kind: { has: null },
      Full_House: { has: null },
      Flush: { has: null },
      Straight: { has: null },
      Three_of_a_Kind: { has: null },
      Two_Pair: { has: null },
      One_Pair: { has: null },
      High_Card: { has: true },
    }
    this.duplicateCount = {}
    this.orderOfCards =
      ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    
    this.hand = this.parseHand(handAsString)
    this.countDuplicates()
    
    //Other hands types not here are checked implicitly
    this.checkRoyalFlush()
    this.checkStraight()
    this.checkStraightFlush()
    this.checkFourOfAKind()
    this.checkFullHouse()
    this.checkThreeOfAKind()
    this.checkTwoPair()
    this.checkHighCard()
  }

  // Parses the input string into a useful sorted DataSet.
  // 
  // Example:
  //   'As Ks Qs Js 10s' => 
  //  [
  //    { suit: 's', value: 'A' },
  //    { suit: 's', value: 'K' },
  //    { suit: 's', value: 'Q' },
  //    { suit: 's', value: 'J' },
  //    { suit: 's', value: '10' },
  //  ]
  parseHand(handAsString) {
    const hand = handAsString.split(' ').map((card) => {
      const suit = card[card.length - 1]
      const value = card.split('')
        .splice(0, card.length - 1)
        .join('')
      return { suit, value }
    })

    return hand.sort((a, b) => this.orderOfCards.indexOf(a.value) > this.orderOfCards.indexOf(b.value))
  }

  countDuplicates() {
    //Remove duplicate values from array of card values
    const handValues = this.hand.map(card => card.value)
    const withoutDuplicateValues = [...new Set(handValues)]

    //Only necessary to continue if values were removed, signaling duplicates
    if (withoutDuplicateValues === 5) return
    
    //Count occurrance of each card and store value in count
    handValues.forEach((value) => {
      this.duplicateCount[value] = this.duplicateCount[value] ? this.duplicateCount[value] + 1 : 1
    })
  }

  checkHighCard() {
    return this.hand[this.hand.length - 1].value
  }

  numPairs() {
    return Object.values(this.duplicateCount).reduce(
      (acc, count) => {
        if (count === 2) acc++
        return acc
      }, 0)
  }

  checkTwoPair() {
    if (this.numPairs() === 2) {
      this.possibleHands.Two_Pair.has = true
      return true
    }
    this.possibleHands.Two_Pair.has = false
    return false
  }

  checkOnePair() {
    if (this.numPairs() === 1) {
      this.possibleHands.One_Pair.has = true
      return true
    }
    this.possibleHands.One_Pair.has = false
    return false
  }

  checkFullHouse() {
    if (this.checkOnePair() && this.checkThreeOfAKind()) {
      this.possibleHands.Full_House.has = true
      return true
    }
    this.possibleHands.Full_House.has = false
    return false
  }

  checkThreeOfAKind() {
    if (Object.values(this.duplicateCount).includes(3)) {
      this.possibleHands.Three_of_a_Kind.has = true
      return true
    }
    this.possibleHands.Three_of_a_Kind.has = false
    return false
  }
  
  checkFourOfAKind() {
    if (Object.values(this.duplicateCount).includes(4)) {
      this.possibleHands.Four_of_a_Kind.has = true
      return true
    }
    this.possibleHands.Four_of_a_Kind.has = false
    return false
  }

  checkStraight() {
    const isStraight = this.hand.reduce((isStraight, card, i, hand) => {
      if (i === hand.length - 1) return isStraight

      const currentCardIndex = this.orderOfCards.indexOf(card.value)
      const nextCardIndex = this.orderOfCards.indexOf(hand[i + 1].value)

      if (nextCardIndex - currentCardIndex !== 1)
        return false

      return isStraight
    }, true)

    if (isStraight) {
      this.possibleHands.Straight.has = true
      return true
    }
    this.possibleHands.Straight.has = false
    return false
  }

  checkFlush() {
    if ([...new Set(this.hand.map(card => card.suit))].length === 1) {
      this.possibleHands.Flush.has = true
      return true
    }
    this.possibleHands.Flush.has = false
    return false
  }

  checkStraightFlush() {
    if (this.checkFlush() && this.checkStraight()) {
      this.possibleHands.Straight_Flush.has = true
      return true
    }
    this.possibleHands.Straight_Flush.has = false
    return false
  }

  checkRoyalFlush() {
    if (this.checkStraightFlush() && this.hand[0].value === '10') {
      this.possibleHands.Royal_Flush.has = true
      return true
    }
    this.possibleHands.Royal_Flush.has = false
    return false
  }

  getRank() {
    const bestHand = Object.keys(this.possibleHands).filter(
      (key) => this.possibleHands[key].has
    )[0]
    return bestHand.split('_').join(' ')
  }
}

module.exports = PokerHand
