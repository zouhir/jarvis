import { h } from "preact";
import styled, { css } from 'emotion/react'
import theme from '../../helpers/theme';
import Sidebar from '../sidebar';
import Block from '../block';

const grid = css`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: -25px 0 0 -25px;
  padding: 0 50px;
  margin-bottom: 160px;
`;

const cell = css`
  flex: 1;
  position: relative;
  padding: 25px 0 0 25px;
`;

const top = css`
align-items: flex-start;
`;

const bottom = css`
align-items: flex-end;
`;

const center = css`
  align-items: center;
`;

const cellTop = css`
align-self: flex-start;
`;

const cellBottom = css`
align-self: flex-end;
`;

const cellCenter = css`
align-self: center;
`;

const cellAuto = css`
flex: none;
`;

const third = css`
flex: 0 0 33.3333%
display: flex;
`;

const half = css`
flex: 0 0 50%
display: flex;
`;

const justifyCenter = css`
  justify-content: center;
`;

import Compiling from '../compiling';

const Board = styled('section')`
  width: 100%;
  height: 100vh;
  // background-image: radial-gradient(600px 600px, #333352 4%, #27273E 81%);
  background-position: top center;
  background-size: 1288px 900px;
  background-repeat: no-repeat;
  background-color: ${theme.dark2}
  padding-top: 150px;
  padding-left: 300px;
`;


const Navbar = () =>
  <Board>
    <Sidebar />
    <div className={grid}>
      <div className={`${cell}`}></div>
      <div className={`${cell} ${half}`}>
        <Compiling />
      </div>
    </div>

    <div className={grid}>
      <div className={`${cell} ${third} ${justifyCenter}`}>
        <Block />
      </div>
      <div className={`${cell} ${third} ${justifyCenter}`}>
        <Block />
      </div>
      <div className={`${cell} ${third} ${justifyCenter}`}>
        <Block />
      </div>
    </div>
  </Board>;

export default Navbar;
