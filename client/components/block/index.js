import { h } from "preact";
import styled, { css, keyframes } from 'emotion/react'
import theme from '../../helpers/theme';

const panel = css`
  width: 100%;
  height: 400px;
  background-image: linear-gradient(-180deg, #343350 21%, #27273D 94%);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const panelHeading = css`
  height: 80px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  &.green {
    background-image: linear-gradient(-47deg, #219CC8 0%, #4ACFC5 100%);
  }
  &.orange {
    background-image: linear-gradient(-47deg, #FF6B9A 0%, #FF8370 100%);
  }
`;


const Panel = (props) => {
  
  return (
    <div className={panel}>
      <div className={`${panelHeading} green`}></div>
    </div>
  )  
  
}

export default Panel;
