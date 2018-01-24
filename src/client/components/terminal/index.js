import { h, Component } from "preact";
import Markup from "preact-markup";

import "./style.scss";

class CommandsList extends Component {
  render({ state, runCommand }) {
    return (
      <div className="commands">
        {state.commands.length > 0 &&
          state.commands.map(cmd => (
            <button
              key={cmd}
              className={state.runningCommands[cmd] && "command-running"}
              title={
                state.runningCommands[cmd] ? `Running ${cmd}` : `start ${cmd}`
              }
              onClick={() => runCommand(cmd, true)}
            >
              {state.commandLabels[cmd]}
              <br />
              <span className="script">{cmd}</span>
            </button>
          ))}
      </div>
    );
  }
}

class CustomOutput extends Component {
  render({ state }) {
    const terminalRunning = state.runningCommands[state.selectedTab]
      ? "terminal-running" // adds hearbeat animation when running
      : "";
    const color = state.runningCommands[state.selectedTab]
      ? "#06ffff" // cyan while running
      : state.failedCommands[state.selectedTab]
        ? "#ff4a50" // red if it did fail
        : "#0df9a3"; // green if didn't fail
    console.log(terminalRunning);
    return (
      <div>
        <span className={`terminal-input ${terminalRunning}`} style={{ color }}>
          $ {state.selectedTab}
        </span>
        <br />
        <br />
        {state.outputs[state.selectedTab] &&
          state.outputs[state.selectedTab].map(output => (
            <Markup trim={false} markup={`<div>${output}</div>`} />
          ))}
      </div>
    );
  }
}

export default class Chart extends Component {
  state = {
    commands: [],
    commandLabels: {
      webpack: "webpack",
      "+": "+"
    },
    tabs: [],
    outputs: {},
    runningCommands: {},
    failedCommands: {},
    selectedTab: "webpack"
  };

  setActiveTab = tab => {
    if (this.state.tabs.indexOf(tab) >= 0 || tab === "webpack" || tab === "+")
      this.setState({ selectedTab: tab });
  };

  closeTab = tab => {
    const { tabs } = this.state;
    const i = tabs.indexOf(tab);
    if (this.state.runningCommands[tab]) this.killCommand(tab);
    if (i >= 0) {
      tabs.splice(i, 1);
      this.setState(prevState => ({
        selectedTab: i > 0 ? prevState.tabs[i - 1] : "webpack",
        tabs
      }));
    }
  };

  runCommand = (cmd, switchTabs) => {
    this.props.socket.emit("custom_command_run", {
      command: cmd
    });

    let { runningCommands, failedCommands } = this.state;
    runningCommands[cmd] = true;
    failedCommands[cmd] = false;

    this.setState({
      runningCommands,
      failedCommands,
      selectedTab: switchTabs ? cmd : this.state.selectedTab
    });

    if (!this.state.tabs.includes(cmd)) {
      this.setState(prevState => ({
        tabs: [...prevState.tabs, cmd],
        selectedTab: cmd
      }));
    } else {
      let { outputs } = this.state;
      outputs[cmd] = [];
      this.setState({
        outputs
      });
    }
  };

  killCommand = cmd => {
    this.props.socket.emit("custom_command_kill", {
      cmd
    });
  };

  handleKeyDown = e => {
    console.log(e);
    if (e.ctrlKey && e.code === "KeyC" && !e.altKey) {
      if (this.state.commands.includes(this.state.selectedTab)) {
        this.killCommand(this.state.selectedTab);
      }
    }
  };

  componentDidMount() {
    const { socket } = this.props;

    // put array of commands into state
    socket.on("custom_command_register_all", data => {
      let commands = [];
      let commandLabels = {
        webpack: "webpack",
        "+": "+"
      };
      data.commands.forEach(cmd => {
        commands.push(cmd.script);
        commandLabels[cmd.script] = cmd.label;
      });
      this.setState({
        commands,
        commandLabels
      });
    });

    socket.on("custom_command_data", data => console.log("DATA: ", data));
    socket.on("custom_command_error", data => console.log("ERROR: ", data));
    socket.on("custom_command_critical_error", data =>
      console.log("CRITICAL_ERROR: ", data)
    );
    socket.on("custom_command_exit", data => console.log("EXIT: ", data));

    socket.on("custom_command_data", e => {
      let { outputs } = this.state;

      if (!outputs[e.command]) outputs[e.command] = [];
      outputs[e.command].push(e.data);

      this.setState({ outputs });
    });

    socket.on("custom_command_error", e => {
      let { outputs } = this.state;

      if (!outputs[e.command]) outputs[e.command] = [];
      outputs[e.command].push(`<div style="color:#ff4a50">${e.error}</div>`);

      this.setState({ outputs });
      console.log(this.state.outputs);
    });

    socket.on("custom_command_critical_error", e => {
      let { outputs } = this.state;

      if (!outputs[e.command]) outputs[e.command] = [];
      outputs[e.command].push(`<div style="color:#ff4a50">${e.error}</div>`);

      this.setState({ outputs });
    });

    socket.on("custom_command_exit", e => {
      let { runningCommands, failedCommands } = this.state;
      runningCommands[e.command] = false;
      failedCommands[e.command] = Number(e.code) !== 0;

      this.setState({
        failedCommands,
        runningCommands
      });
    });

    socket.on("compiler_done", e => {
      this.state.tabs.forEach(cmd => {
        if (this.state.runningCommands[cmd]) return false;
        this.runCommand(cmd, false);
      });
    });

    document.body.onkeydown = this.handleKeyDown;
  }

  render(props) {
    return (
      <section className="terminals">
        <div className="tabs">
          {["webpack"]
            .concat(this.state.tabs)
            .concat(["+"])
            .map(command => (
              <div
                key={command}
                className={
                  "tab " +
                  (command == this.state.selectedTab && " active ") +
                  (this.state.failedCommands[command] && " failed ")
                }
                onClick={() => this.setActiveTab(command)}
              >
                {this.state.commandLabels[command]}
                {command !== "webpack" &&
                  command !== "+" &&
                  this.state.selectedTab === command && (
                    <span
                      onClick={() => this.closeTab(command)}
                      className="close"
                    >
                      X
                    </span>
                  )}
              </div>
            ))}
        </div>
        <div className="terminal">
          {this.state.selectedTab === "webpack" ? (
            <div className="output">
              {props.logs.map(log => (
                <Markup trim={false} markup={`<div>${log}</div>`} />
              ))}
            </div>
          ) : this.state.selectedTab === "+" ? (
            <CommandsList state={this.state} runCommand={this.runCommand} />
          ) : (
            <div className="output">
              <CustomOutput state={this.state} />
            </div>
          )}
        </div>
      </section>
    );
  }
}
