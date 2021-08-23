import React from 'react';
import styled from 'styled-components';

// import { colors } from '../Components/styled/colors';
import { fonts } from '../Components/styled/fonts';

import icons from '../assets/icons/cardsIcons';

const WrapperSpanStyled = styled.span`
  display: none;
`;

const CardWrapper = styled.div`
  height: 180px;
  width: 110px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 10px;
  position: relative;
  margin-top: -120px;

  font-family: ${fonts.Change};
  background-color: azure;

  border: 1px solid rgb(20, 63, 0);
  border-radius: 3px;

  z-index: ${(props) => props.z};

  cursor: pointer;
  &:hover {
    transform: scale(1.01);
  }
  &.hidden ${WrapperSpanStyled} {
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1000;
    background-color: #fdb9b8;
    border: 4px white;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%23bc0b06' fill-opacity='0.97' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E");
  }
`;

const CardStartWrapper = styled.h2`
  align-self: start;
`;
const CardEndWrapper = styled.h2`
  align-self: end;
`;
const CardCenterImage = styled.img`
  width: 20px;
  height: 20px;
  align-self: center;
`;

const cardObj = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
const cardNumberCalc = (number) => {
  if (number > 10 || number === 1) {
    return cardObj[number];
  } else {
    return number;
  }
};
const Card = (props) => {
  const cardToShow = cardNumberCalc(props.cardNumber);
  return (
    <CardWrapper
      className={props.hidden ? 'hidden' : ''}
      data-card-number={props.cardNumber}
      onDrag={props.dragStart}
      draggable={true}
      z={props.z}
    >
      <WrapperSpanStyled />
      <CardStartWrapper>{cardToShow}</CardStartWrapper>
      <CardCenterImage src={icons[props.cardType]} />
      <CardEndWrapper>{cardToShow}</CardEndWrapper>
    </CardWrapper>
  );
};

export default Card;
