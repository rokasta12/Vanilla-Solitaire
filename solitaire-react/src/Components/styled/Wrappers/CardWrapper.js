import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../../Card';
import Container from './Container';
import { Game } from '../../../Game/Game';

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 100px);
  margin-top: 200px;
  justify-content: space-between;
`;

const CardWrapper = () => {
  const game = new Game('reverse-solitaire');
  const newBoard = game.board;
  const newClosedCards = game.closedCards;
  const [board, setBoard] = useState(newBoard);
  const [closedCards, setClosedCards] = useState(newClosedCards);

  useEffect(() => {}, [newBoard]);

  function dragStart(rowIndex, x, cardNumber, event) {
    console.log(x);
    console.log(cardNumber);

    event.dataTransfer.setData('rowsIndex', rowIndex);
    event.dataTransfer.setData('cardsid', x);
    event.dataTransfer.setData('cardsnumber', cardNumber);
    /*  const index = board[0].findIndex((y) => y.id === x);
    board[0].splice(index, 1);
    console.log('D22');
    setBoard(board); */
  }

  function onDrop(lastElement, event) {
    console.log(event);
    console.log('dropped');
    const draggedCaardsrowsIndex = event.dataTransfer.getData('rowsIndex');
    const cardIdToDrop = event.dataTransfer.getData('cardsid');
    const cardToDrop = event.dataTransfer.getData('cardsnumber');
    console.log('card to drop: ', cardToDrop);
  }

  function onDragOver(event, lastElement) {
    event.preventDefault();
    console.log(lastElement);
    console.log('drag event: ', event.dataTransfer.getData('cardsid'));
  }
  function giveNewCard() {
    const copyBoard = board;
    const tenCardsToDistribute = closedCards.splice(0, 10);
    tenCardsToDistribute.forEach((card, index) => {
      copyBoard[index].push(card);
    });
    setBoard(copyBoard);
    setClosedCards(closedCards);
  }
  return (
    <Container>
      <h1 onClick={() => giveNewCard()}>Give me card</h1>
      <StyledCardWrapper>
        <div>
          {board[0].map((x, index) => (
            <Card
              hidden={index !== board[0].length - 1 ? true : false}
              cardNumber={x.card}
              cardType={'spades'}
              key={x.id}
              dragStart={(event) => dragStart(0, x.id, x, event)}
              z={index}
            ></Card>
          ))}
        </div>

        <div>
          {board[1].map((x, index) => (
            <Card
              hidden={index !== board[1].length - 1 ? true : false}
              cardNumber={x.card}
              cardType={'spades'}
              key={x.id}
              dragStart={(event) => dragStart(1, x.id, x, event)}
              z={index}
            ></Card>
          ))}
        </div>
        <div
          onDragOver={(event) =>
            onDragOver(event, board[2][board[2].length - 1])
          }
          onDrop={(event) => onDrop(board[2][board[2].length - 1], event)}
        >
          {board[2].map((x, index) => (
            <Card
              hidden={index !== board[2].length - 1 ? true : false}
              cardNumber={x.card}
              cardType={'spades'}
              key={x.id}
              z={index}
              dragStart={(event) => dragStart(2, x.id, x, event)}
            ></Card>
          ))}
        </div>
        <div>
          {board[3].map((x, index) => (
            <Card
              hidden={index !== board[3].length - 1 ? true : false}
              cardNumber={x.card}
              cardType={'spades'}
              key={x.id}
              z={index}
              dragStart={(event) => dragStart(3, x.id, x, event)}
            ></Card>
          ))}
        </div>
        <div>
          {board[4].map((x, index) => (
            <Card
              hidden={index !== board[4].length - 1 ? true : false}
              cardNumber={x.card}
              cardType={'spades'}
              key={x.id}
              dragStart={(event) => dragStart(4, x.id, x, event)}
              z={index}
            ></Card>
          ))}
        </div>
        <div>
          {board[5].map((x, index) => (
            <Card
              hidden={index !== board[5].length - 1 ? true : false}
              cardNumber={x.card}
              cardType={'spades'}
              key={x.id}
              dragStart={(event) => dragStart(5, x.id, x, event)}
              z={index}
            ></Card>
          ))}
        </div>
        <div>
          {board[6].map((x, index) => (
            <Card
              hidden={index !== board[6].length - 1 ? true : false}
              cardNumber={x.card}
              cardType={'spades'}
              key={x.id}
              z={index}
              dragStart={(event) => dragStart(6, x.id, x, event)}
            ></Card>
          ))}
        </div>
        <div>
          {board[7].map((x, index) => (
            <Card
              hidden={index !== board[7].length - 1 ? true : false}
              cardNumber={x.card}
              cardType={'spades'}
              key={x.id}
              z={index}
            ></Card>
          ))}
        </div>
        <div>
          {board[8].map((x, index) => (
            <Card
              cardNumber={x.card}
              hidden={index !== board[8].length - 1 ? true : false}
              cardType={'spades'}
              key={x.id}
              z={index}
            ></Card>
          ))}
        </div>
        <div onClick={() => console.log('clicked')}>
          {board[9].map((x, index) => (
            <Card
              cardNumber={x.card}
              hidden={index !== board[9].length - 1 ? true : false}
              cardType={'spades'}
              key={x.id}
              z={index}
            ></Card>
          ))}
        </div>
        {/*
        <Card className="hidden" cardNumber={3} cardType={'spades'} />
        <Card cardNumber={4} dragStart={dragg} cardType={'spades'} />
        <Card cardNumber={9} cardType={'spades'} />
        <Card cardNumber={3} cardType={'spades'} />
        <Card cardNumber={3} cardType={'spades'} />
        <Card cardNumber={12} cardType={'spades'} />
        <Card cardNumber={3} cardType={'spades'} />
        <Card cardNumber={3} cardType={'spades'} />
        <Card cardNumber={3} cardType={'spades'} />
        <Card cardNumber={3} cardType={'spades'} /> */}
      </StyledCardWrapper>
    </Container>
  );
};

export default CardWrapper;
