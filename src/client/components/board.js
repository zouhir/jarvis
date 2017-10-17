import { h, Component } from 'preact';

import MiniCard from './mini-card';
import Bundlelist from './bundles-list';
import Terminal from './terminal';
import Table from './table';
import PerfBudget from './perf-budget';

import { readableBytes } from '../helpers/utils';
import Nav from './nav';

import io from 'socket.io-client';
const socket = io('localhost:3001')

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
    socket.on('stats', (report) => {
      this.setState({
        assets: report.assets || [],
        errors: report.errors,
        warnings: report.warnings,
        success: report.success,
        time: report.time / 1e3,
        modules: report.modules,
        performance: report.performance || {},
        assetsSize: report.assetsSize || 'NaN'
      })
    });

    socket.on('progress', (data) => {
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
              status={state.errors.length}
              note={state.warnings.length === 0 ? 'and no warnings' : `and ${state.warnings.length} warnings`}
              color="berry"
            />
            {
              state.assetsSize ?
                <MiniCard
                  title="Total Bundles Size"
                  status={readableBytes(state.assetsSize)}
                  note=""
                  color="evening"
                />
                : null
            }
          </div>
          <div className="col-xs-12 col-md-4 col-lg-6">
            <Terminal errors={state.errors} success={state.success} warnings={state.warnings} />
          </div>
          <div className="col-xs-12 col-md-4 col-lg-3">
            <Bundlelist assets={state.assets} />
          </div>
        </div>
        <div className="row widgets">
          <div className="col-xs-12 col-md-4 col-lg-6">
            <Table data={state.modules} />
          </div>
          <div className="col-xs-12 col-md-4 col-lg-3">
            <PerfBudget />
          </div>
        </div>
      </div>
    )
  }
}