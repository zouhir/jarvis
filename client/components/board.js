import { h, Component } from 'preact';

import MiniCard from './mini-card';
import Bundlelist from './bundles-list';
import Terminal from './terminal';
import Table from './table';

import mockdata from '../mockdata.json';

import { readableBytes } from '../helpers/utils';

import Nav from './nav';

export default class Board extends Component {
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
    return (
      <div className="board">
        <Nav />
        <div className="row widgets">
          <div className="col-xs-12 col-md-4 col-lg-3">
            {
              state.progress ?
                <MiniCard
                  title="Compiler Status"
                  note={`done in ${state.time} sec`}
                  progress={state.progress.percentage * 100}
                  status={state.progress.message || 'Idle'}
                  color="fire"
                /> : null
            }

            <MiniCard
              title="Error"
              status="0"
              note="and no warnings"
              color="berry"
            />
            {
              state.assetsSize ?
                <MiniCard
                  title="Total Bundles Size"
                  status={readableBytes(state.assetsSize)}
                  note="too big"
                  color="evening"
                />
                : null
            }
          </div>
          <div className="col-xs-12 col-md-4 col-lg-6">
            <Terminal />
          </div>
          <div className="col-xs-12 col-md-4 col-lg-3">
            <Bundlelist />
          </div>
        </div>
        <div className="row widgets">
          <div className="col-xs-12 col-md-4 col-lg-6">
            <Table />
          </div>
        </div>
      </div>
    )
  }
}