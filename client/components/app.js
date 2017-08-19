import { h } from "preact";
import styled, { css, fontFace, keyframes, injectGlobal } from 'emotion/react'
import theme from '../helpers/theme';

import Navbar from './navbar'
import Board from './board'

injectGlobal`
  html, body {
    background: ${theme.dark2}
    font-family: Montserrat;
      color: #495057;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      -o-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
    }
  `;

fontFace`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v10/BYPM-GE291ZjIXBWrtCweteM9fzAXBk846EtUMhet0E.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`;

fontFace`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYAzyDMXhdD8sAj6OAJTFsBI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215
;`

fontFace`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v10/IVeH6A3MiFyaSEiudUMXEweOulFbQKHxPa89BaxZzA0.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`;

fontFace`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v10/H8_7oktkjVeeX06kbAvc0GXcKQM3CJKNQg5O_z0AU2U.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`;

let Main = () =>
  <div>
    <Navbar />
    <Board />
  </div>;

export default Main;
