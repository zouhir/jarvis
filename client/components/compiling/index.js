import { h } from "preact";
import styled, { css, keyframes } from 'emotion/react'
import theme from '../../helpers/theme';

import { Circle } from 'rc-progress';

const panel = css`
  position: relative;
  height: 250px;
  margin-left: 80px;
  svg {
    height: 250px;
  }
`;

const Perc = styled(`h1`)`
  font-weight: 800;
  font-size: 78px;
  color: #FFF;
  opacity: 0.05;
  position: absolute;
  top: 50%;
  padding: 0;
  margin: 0;
  transform: translateY(-50%);
  text-align: center;
  width: 100%;
`;

const Timer = styled('p')`
  font-weight: 300;
  font-size: 18px;
  width: 100%;
  color: #FFF;
  opacity: 0.5;
  text-align: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
`;

const Compiling = (props) => {
  
  return (
    <div className={panel}>
      <Circle percent="4" strokeWidth="4" trailWidth="4" trailColor="#454270" strokeColor="#52D3CC" />
      <Perc>4</Perc>
      <Timer>00:30</Timer>
    </div>
  )  
  
}

export default Compiling;
