import { h, Component } from "preact";
import styled, { css } from 'emotion/react'
import theme from '../../helpers/theme';
import Sidebar from '../sidebar';
import Block from '../block';

import mockdata from '../../mockdata.json';

import AssetsList from '../assets-list';
import ModulesList from '../modules-list';
import SorryForThePoop from '../sorry-for-the-poop';
import MainBlock from '../main-block';

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

const center = css`
  align-items: center;
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
    assetsSize: 0,
    progress: {},
    time: 0,
    assets: [],
    errors: [],
    warnings: [],
    modules: [],
    performance: {}
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
    socket.on('compiler_watch', (response) => {
      console.log(response);
      let { data } = response
      this.setState({
        assets: data.assets || [],
        errors: data.errors,
        warnings: data.warnings,
        time: data.time / 1e3,
        modules: data.modules,
        performance: data.performance || {}
      })
    });

    socket.on('compiler_percentage', (data) => {
      this.setState({
        progress: data
      })
    });
  }
  render(props, state) {
    console.log(state.performance);
    return (
      <Board>
        <div className={grid}>
          <div className={`${cell}`}>
            <Block color='black'>
              
            </Block>
          </div>
          <div className={`${cell} ${half} ${center}`}>
            <Compiling progress={state.progress} time={state.time} errors={state.errors.length} warnings={state.warnings.length} />
          </div>
        </div>
  
        <div className={grid}>
          <div className={`${cell} ${third} ${justifyCenter}`}>
            <Block color='purple' title="Assets">
              <AssetsList assets={mockdata.assets || []} assetsSize={state.assetsSize} />
            </Block>
          </div>
          <div className={`${cell} ${third} ${justifyCenter}`}>
            <Block color='orange' title="Modules">
              <ModulesList modules={state.modules} />
            </Block>
          </div>
          <div className={`${cell} ${third} ${justifyCenter}`}>
            <Block color='green' title="Performance">
              {
                state.performance ? <SorryForThePoop emoji='💩' message='no per budget set!' /> : null
              }
            </Block>
          </div>
        </div>
      </Board>
    )
  }
}
  

export default BoardComponent;
