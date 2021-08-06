const bottomCardContainer = document.querySelector('#card-container-bottom');

var r = document.querySelector(':root');
r.style.setProperty('--bottom-card-row-count', 7);
r.style.setProperty('--bottom-card-row-count-bottom', 7);

function paintCards(cards) {
  const bottomCardContainer = document.querySelector('#card-container-bottom');

  cards.forEach((row, index) => {
    const cardObj = { 11: 'J', 12: 'Q', 13: 'K' };

    const generatedRow = document.createElement('div');
    const classOfRow = `row-bottom-${String(index + 1)}`;
    generatedRow.classList.add('row-bottom', classOfRow);

    const rowsLength = row.length;

    row.forEach((rowsCard, index) => {
      console.log(rowsLength);

      const cardsNumber = rowsCard.slice(1, rowsCard.length);
      const cardsName = cardsNumber > 10 ? cardObj[cardsNumber] : cardsNumber;
      const card = `
        <div data-card='${rowsCard}' data-cardnumber='${cardsNumber}' class="card ${
        index === rowsLength - 1 ? '' : 'hidden'
      }" style="z-index:${index + 1} " >
              <div class="start"><h2> ${cardsName} </h2></div>
              <div class="end"><h2>${cardsName}</h2></div>
        </div>`;
      generatedRow.insertAdjacentHTML('beforeend', card);
    });
    bottomCardContainer.appendChild(generatedRow);
  });
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class Game {
  constructor(gameType) {
    this.gameType = gameType;
    this.cardObj = { 11: 'J', 12: 'Q', 13: 'K' };
    this.pileCount = 7;
    this.cards = this.shuffleCards();
    this.moves = [];
    this.board = this.distributeCards(this.cards);
    console.log(this.board);
  }

  shuffleCards() {
    // Kupa , Maça , Sinek , Karo
    // Hearts ,Spades ,Clubs , Diamonds
    let cards = [];
    const cardSpecies = 'HSCD';
    for (let i in cardSpecies) {
      let cardsName = cardSpecies[i];

      for (let index = 1; index < 14; index++) {
        cards.push(cardsName + index);
      }
    }
    return shuffleArray(cards);
  }

  distributeCards() {
    const cardsCopy = [...this.cards];
    const board = [];
    for (let row = 1; row <= this.pileCount; row++) {
      const rowsCards = cardsCopy.splice(0, row);
      board.push(rowsCards);
    }
    paintCards(board);
    return board;
  }
}
function allowDrop(ev) {
  ev.preventDefault();

  const containerCardsNumber = ev.target.dataset.cardnumber;
  var data = ev.dataTransfer.getData('cardsnumber');
  console.log('cards number', data);
  /*   if (containerCardsNumber - data !== 1) {
    alert('You cant');
  } */
}

function dragstart_handler(event) {
  // Add the target element's id to the data transfer object
  event.dataTransfer.setData('cardsdata', event.target.dataset.card);
  event.dataTransfer.setData('cardsnumber', event.target.dataset.cardnumber);
}
function drop(ev) {
  ev.preventDefault();
  const containerCardsNumber = ev.target.dataset.cardnumber;

  var data = ev.dataTransfer.getData('cardsnumber');
  var cardsDataAsId = ev.dataTransfer.getData('cardsdata');

  if (containerCardsNumber - data !== 1) {
    alert('You cant');
  } else {
    ev.target.parentElement.appendChild(
      document.querySelector(`[data-card='${cardsDataAsId}']`)
    );
  }
}
window.addEventListener('DOMContentLoaded', () => {
  const a = new Game();
  // Get the element by id
  const elements = document.querySelectorAll(
    '#card-container-bottom .card:not(.hidden)'
  );
  // Add the ondragstart event listener
  elements.forEach((element) => {
    element.setAttribute('draggable', true);
    element.addEventListener('dragstart', dragstart_handler);
    element.addEventListener('drop', drop);
    element.addEventListener('dragover', allowDrop);
  });
});
