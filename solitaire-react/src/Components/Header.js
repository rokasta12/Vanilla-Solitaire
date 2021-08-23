import { React, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../Components/styled/colors';

const Wrapper = styled.div`
  height: 50px;
  width: 100%;

  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.lightOrange};
  color: ${colors.lightPink};
`;

const HeaderTitle = styled.h2`
  font-size: 22px;
`;

const StyledHeader = () => {
  const [time, setTime] = useState(0);
  setTime('0:00');
  // setInterval(timePlus(), 1000);

  return (
    <Wrapper>
      <HeaderTitle>Spider Solitaire</HeaderTitle>
      <HeaderTitle>{time}</HeaderTitle>
      <HeaderTitle>Start a new Game</HeaderTitle>
    </Wrapper>
  );
};

export default StyledHeader;
