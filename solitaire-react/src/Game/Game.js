function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export class Game {
  constructor(gameType) {
    this.gameType = gameType;
    this.cards = this.shuffleCards();
    this.board = this.distributeCards()[0];
    this.closedCards = this.distributeCards()[1];
  }
  shuffleCards() {
    // Kupa , Maça , Sinek , Karo
    // Hearts ,Spades ,Clubs , Diamonds
    /*
     * Total iki desteyle oynanıyor.
     * 104 kartı karıştır => 54 kartı al.
     * Sonra 54 kartı 6 * 4 +  5 * 6 olacak şekilde 10 sütuna dağıt.
     */
    /*     for (let index = 0; index < 2; index++) {
      const cardSpecies = 'HSCD';
      for (let i in cardSpecies) {
        for (let index = 1; index < 14; index++) {
          let cardsName = index;
          cards.push(cardsName);
        }
      }
    }
     */
    const cards = Array.from({ length: 104 }, function (item, index) {
      return { card: (index % 13) + 1, id: index };
    });
    return shuffleArray(cards);
  }

  distributeCards() {
    const cardsCopy = [...this.cards];
    const board = [];
    const rowsOrder = [6, 6, 6, 6, 5, 5, 5, 5, 5, 5];
    for (let row = 0; row < rowsOrder.length; row++) {
      const rowsCards = cardsCopy.splice(0, rowsOrder[row]);
      board.push(rowsCards);
    }
    return [board, cardsCopy];
  }
}
