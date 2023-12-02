// import { createGlobalStyle } from 'styled-components';
// import SilkFlower from '../src/assets/SilkFlower.woff';


// const GlobalStyles = createGlobalStyle`
//   @font-face {
//     font-family: 'Silk Flower';
//     src: local('MyCustomFont'), 
//          url(${SilkFlower}) format('woff'), 

//   }

// `;

// // export default GlobalStyles;


import { createGlobalStyle } from 'styled-components';
import SilkFlower from '../src/assets/SilkFlower.woff';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Silk Flower';
    src: local('Silk Flower'),
      url(${SilkFlower}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body,
  html {
    margin: 0;
    padding: 0;
  }

`;

export default GlobalStyles;