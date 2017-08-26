import { h } from "preact";
import styled, { css, keyframes } from 'emotion/react'
import theme from '../../helpers/theme';

import PercentageStatus from '../percentage-status';

import { Circle } from 'rc-progress';

const wrapper = css`
  display: flex;
  flex-wrap: nowrap;
`;

const panel = css`
  display: flex;
  position: relative;
  height: 225px;
  margin-left: 60px;
  margin-right: 60px;
  svg {
    height: 225px;
  }
`;

const Perc = styled(`h1`)`
  font-weight: 800;
  font-size: 78px;
  color: #31314c;
  position: absolute;
  top: 50%;
  padding: 0;
  margin: 0;
  transform: translateY(-50%);
  text-align: center;
  width: 100%;
`;

const Timer = styled('p')`
  font-size: 18px;
  width: 100%;
  color: #FFF;
  opacity: 0.5;
  text-align: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
`;


const panelRight = css`
  flex:none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Compiling = (props) => {
  let { progress, errors, warnings } = props
  let percentage = progress.percentage ? progress.percentage * 100 : 100
  let status = progress.message || 'idle'
  errors = errors === 0 ? 'No' : errors
  warnings = warnings === 0 ? 'No' : warnings
  return (
    <div className={wrapper}>
      <div className={panel}>
        <Circle percent={percentage} strokeWidth="4" trailWidth="4" trailColor="#454270" strokeColor="#52D3CC" />
        <Perc>{percentage}</Perc>
        <Timer>{props.time}</Timer>
      </div>
      <div className={panelRight}>
        <PercentageStatus title='Status' status={status} />
        <PercentageStatus title='Errors' status={`${errors} Errors`} />
        <PercentageStatus title='Warnings' status={`${warnings} Warnings`} />
      </div>
    </div>
  )  
  
}

export default Compiling;
