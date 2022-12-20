import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-size: ${((props) => props.theme.size.default)};
  }
  
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
