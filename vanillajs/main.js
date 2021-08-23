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
      <span class="wrapper-span"></span>
              <div class="start"><h2> ${cardsName}  </h2></div>
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

function giveMeCard(event) {
  const shuffledCardContainer = document.querySelector('.row-2 > div');
  const shuffledDiv = event.currentTarget;
  const shuffledCardArray =
    shuffledDiv.parentElement.nextElementSibling.children[0].children;
  const cLength = shuffledCardArray.length;

  if (shuffledCardContainer.classList.contains('non-visible')) {
    shuffledCardContainer.classList.remove('non-visible');
    shuffledCardArray[cLength - 1].classList.remove('hidden');
  } else {
    shuffledCardArray[cLength - 1].classList.remove('hidden');
    const lastElement = shuffledCardArray[cLength - 1];
    lastElement.remove();
    shuffledCardArray[cLength - 2].classList.remove('hidden');
  }
}

function paintLeftCards(leftCards) {
  const div = document.createElement('div');
  div.classList.add('non-visible');
  leftCards.forEach((leftCard, index) => {
    const cardObj = { 11: 'J', 12: 'Q', 13: 'K' };

    const cardsNumber = leftCard.slice(1, leftCard.length);
    const cardsName = cardsNumber > 10 ? cardObj[cardsNumber] : cardsNumber;
    const card = `
      <div data-card='${leftCard}' data-cardnumber='${cardsNumber}' class="card hidden" style="z-index:${
      index + 1
    } " >
    <span class="wrapper-span"></span>
            <div class="start"><h2> ${cardsName}  </h2></div>
            <div class="end"><h2>${cardsName}</h2></div>

      </div>`;
    div.insertAdjacentHTML('beforeend', card);
  });
  document.querySelector('.row-2').insertAdjacentElement('beforeend', div);
}

class Game {
  constructor(gameType) {
    this.gameType = gameType;
    this.cardObj = { 11: 'J', 12: 'Q', 13: 'K' };
    this.pileCount = 7;
    this.cards = this.shuffleCards();
    this.moves = [];
    const x = this.distributeCards();
    this.board = x[0];
    this.leftCards = x[1];
    paintLeftCards(this.leftCards);
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

    return [board, cardsCopy];
  }
}
function allowDrop(ev) {
  ev.preventDefault();

  const containerCardsNumber = ev.target.dataset.cardnumber;
  var data = ev.dataTransfer.getData('cardsnumber');
  console.log('cards number', data);
  /*   if (containerCardsNumber - data !== 1) {
    document.body.style.cursor = 'grab';
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
  console.log(containerCardsNumber);
  var data = ev.dataTransfer.getData('cardsnumber');
  var cardsDataAsId = ev.dataTransfer.getData('cardsdata');

  if (containerCardsNumber - data !== 1) {
    alert('You cant');
  } else {
    const draggedElement = document.querySelector(
      `[data-card='${cardsDataAsId}']`
    );
    const childrenOfDraggedRow = draggedElement.parentElement.children;
    if (childrenOfDraggedRow && childrenOfDraggedRow.length >= 2) {
      childrenOfDraggedRow[childrenOfDraggedRow.length - 2].classList.remove(
        'hidden'
      );
    }
    ev.target.parentElement.appendChild(draggedElement);
    const rowsAllCards = draggedElement.parentElement.querySelectorAll('.card');
    const z = rowsAllCards[rowsAllCards.length - 2].style.zIndex;
    draggedElement.style.zIndex = z;

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
const shuffledDiv = document.querySelector('.shuffled');

/* const shuffledCardArray = shuffledDiv.parentElement.nextElementSibling.children;
shuffledCardArray[shuffledCardArray.length - 1].classList.remove('hidden'); */

shuffledDiv.addEventListener('click', giveMeCard);
