import { createGlobalStyle } from 'styled-components';
import { fonts } from './fonts';
const GlobalStyle = createGlobalStyle`
  * {
      margin:0;
      padding:0;
      box-sizing:border-box;
  }
  body {
    font-family:${fonts.Ubuntu};
    max-width: 100%;
  }
`;

export default GlobalStyle;
