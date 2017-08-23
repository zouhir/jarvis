import { h } from "preact";
import styled, { css, keyframes } from 'emotion/react'
import theme from '../../helpers/theme';
import { readableBytes } from '../../helpers/utils';

import List from '../list';

import AssetsList from '../assets-list';

const panel = css`
  width: 100%;
  height: 400px;
  // background-image: linear-gradient(-180deg, #343350 21%, #27273D 94%);
  background-color: ${theme.dark3};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  &.black {
    background-image: none;
    background-color: ${theme.dark3};
  }
`;

const panelHeading = css`
  height: 60px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0 2px 10px 4px rgba(0,0,0,0.09);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  &.green {
    background-image: linear-gradient(-47deg, #219CC8 0%, #4ACFC5 100%);
  }
  &.orange {
    background-image: linear-gradient(-47deg, #FF6B9A 0%, #FF8370 100%);
  }
  &.purple {
    background-image: linear-gradient(-47deg, #B154F4 0%, #7D71FC 100%);
  }
  &.black {
    background-image: linear-gradient(-48deg, #333254 0%, #333254 100%);
  }
`;

const Box = styled('div')`
  background: #FFF;
  border-radius: 3px;
  min-width: 26px;
  height: 26px;
  line-height: 26px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: ${theme.dark1};
  margin-right: 5px;
  padding: 0px 7px;
  &.oversize {
    padding-right: 30px;
    background-image: url('../../assets/images/alert.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: right 7px center;
  }
`

const Count = styled('h2')`
  font-weight: 800;
  font-size: 40px;
  line-height: 30px;
  color: #FFF;
  opacity: 0.15;
  position: absolute;
  left: -4px;
  bottom: -2px;
`;


const leftPanel = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #FFF;
`;

const rightPanel = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #FFF;
  margin-left: auto;
`;

const Block = ({color = 'green', title='', assets = [], assetsSize = null}) => {
  return (
    <div className={`${panel} ${color}`}>
      <div className={`${panelHeading} ${color}`}>
        <div className={leftPanel}>
          <Box>3</Box>
          Total Assets
        </div>
        <div className={rightPanel}>
          <Box className={'oversize'}>{readableBytes(assetsSize)}</Box>
        </div>
        <Count>{title}</Count>
      </div>
      {
        assets.length > 0 ? <AssetsList assets={assets} /> : <List />
      }
    </div>
  )  
  
}

export default Block;
