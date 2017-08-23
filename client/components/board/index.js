import { h, Component } from "preact";
import styled, { css } from 'emotion/react'
import theme from '../../helpers/theme';
import Sidebar from '../sidebar';
import Block from '../block';

import mockdata from '../../mockdata.json';

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
  background-position: top center;
  background-size: 1288px 900px;
  background-repeat: no-repeat;
  background-color: ${theme.dark2}
  padding-top: 150px;
`;

class BoardComponent extends Component {
  state = {
    assetsSize: 0
  }
  componentDidMount() {
    if(mockdata.assets && mockdata.assets.length) {
      let totalAssetsSize = mockdata.assets.reduce((sum, asset) => {
        return sum = sum + asset.size
      }, 0)
      this.setState({
        assetsSize: totalAssetsSize
      })
    }
  }
  render(props, state) {
    return (
      <Board>
        <div className={grid}>
          <div className={`${cell}`}>
            <Block color='black' /> 
          </div>
          <div className={`${cell} ${half} ${center}`}>
            <Compiling />
          </div>
        </div>
  
        <div className={grid}>
          <div className={`${cell} ${third} ${justifyCenter}`}>
            <Block color='purple' title="Assets" assets={mockdata.assets || []} assetsSize={state.assetsSize}/>
          </div>
          <div className={`${cell} ${third} ${justifyCenter}`}>
            <Block color='orange' title="Modules" />
          </div>
          <div className={`${cell} ${third} ${justifyCenter}`}>
            <Block color='green' title="Performance" />
          </div>
        </div>
      </Board>
    )
  }
}
  

export default BoardComponent;
