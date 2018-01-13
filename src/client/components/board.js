import { h, Component } from "preact";

import MiniCard from "./mini-card";
import Bundlelist from "./bundles-list";
import Terminal from "./terminal";
import Table from "./table";
import PerfBudget from "./perf-budget";

import { readableBytes } from "../helpers/utils";
import Nav from "./nav";

import io from "socket.io-client";
const socket = io("localhost:1337");

export default class Board extends Component {
  state = {
    assetsSize: 0,
    progress: {},
    time: 0,
    assets: [],
    errors: [],
    warnings: [],
    modules: {
      cjs: [],
      esm: [],
      mixed: []
    },
    logs: [],
    performance: {},
    project: {}
  };
  componentDidMount() {
    socket.on("project", report => {
      this.setState({ project: report });
    });
    socket.on("stats", report => {
      let logs = [];
      if (report.errors && report.errors.length > 0) {
        logs = report.errors;
      }
      if (report.warnings && report.warnings.length > 0) {
        logs = report.warnings;
      }
      if (report.success && report.success.length > 0) {
        logs = report.success;
      }
      console.log(report);
      this.setState({
        assets: report.assets || [],
        errors: report.errors || [],
        warnings: report.warnings || [],
        success: report.success || [],
        time: report.time / 1e3 || 0,
        modules: report.modules || [],
        performance: report.performance || {},
        assetsSize: report.assetsSize || "NaN",
        logs: logs
      });
    });
    socket.on("progress", data => {
      this.setState({
        progress: data
      });
      if (data.message.toLowerCase() !== "idle") {
        this.setState({
          progress: data,
          logs: [`<p>${data.message}</p>`, `<p>${data.percentage * 100}%</p>`]
        });
      }
    });
  }
  render(props, state) {
    return (
      <div className="board">
        <Nav {...state.project} />

        <div className="widget col-xs-12 col-md-4 col-lg-3">
          <MiniCard
            title="Compiler Status"
            note={`done in ${state.time} sec`}
            progress={state.progress.percentage * 100}
            status={state.progress.message || "Idle"}
            color="fire"
          />

          <MiniCard
            title="Errors and Warnings"
            status={state.errors.length}
            note={
              state.warnings.length === 0
                ? "and no warnings"
                : `and ${state.warnings.length} warnings`
            }
            color="berry"
          />
          <MiniCard
            title="Total Assets Size"
            status={readableBytes(state.assetsSize)}
            note=""
            color="evening"
          />
        </div>
        <div className="widget col-xs-12 col-md-4 col-lg-6">
          <Terminal logs={state.logs} />
        </div>
        <div className="widget  col-xs-12 col-md-4 col-lg-3">
          <Bundlelist assets={state.assets} />
        </div>

        <div className="widget col-xs-12 col-md-4 col-lg-6">
          <Table data={state.modules} />
        </div>
        <div className="widget col-xs-12 col-md-8 col-lg-6">
          <PerfBudget assetsSize={state.assetsSize} />
        </div>
      </div>
    );
  }
}
