import { h, Component } from "preact";
import Markup from "preact-markup";

import "./style.scss";

class CommandsList extends Component {
  render({ state, runCommand }) {
    return (
      <div>
        {state.commands.length > 0 &&
          state.commands.map(cmd => (
            <button onClick={() => runCommand(cmd)}>{cmd}</button>
          ))}
      </div>
    );
  }
}

class CustomOutput extends Component {
  render({ state }) {
    return (
      <div>
        <span
          class={
            "terminal-input " + state.runningCommands[state.selectedTab]
              ? "terminal-running"
              : ""
          }
          style={{
            color: state.failedCommands[state.selectedTab]
              ? "#ff4a50"
              : "#06ffff"
          }}
        >
          $ {state.selectedTab}
        </span>
        <br />
        <br />
        {state.outputs[state.selectedTab] &&
          state.outputs[state.selectedTab].map(output => <div>{output}</div>)}
      </div>
    );
  }
}

export default class Chart extends Component {
  state = {
    commands: [],
    tabs: [],
    outputs: {},
    runningCommands: {},
    failedCommands: {},
    selectedTab: "webpack"
  };

  setActiveTab = tab => {
    this.setState({ selectedTab: tab });
  };

  runCommand = cmd => {
    console.log(cmd);
    this.props.socket.emit("custom_command_run", {
      command: cmd
    });
    console.log("LOLOLLLLfewnnnnnnnnnnnLL");
    if (!this.state.tabs.includes(cmd)) {
      console.log("LOLOLLLLLLLLLLLLLLLL");
      this.setState(prevState => {
        tabs: [...prevState.tabs, cmd];
      });
    }
  };

  componentDidMount() {
    const { socket } = this.props;

    // register that a command got registered
    socket.on("custom_command_register", data => {
      if (!this.state.commands.includes(data.command)) {
        this.setState(prevState => ({
          commands: [...prevState.commands, data.command]
        }));
      }
    });

    socket.on("custom_command_data", data => console.log("DATA: ", data));
    socket.on("custom_command_error", data => console.log("ERROR: ", data));
    socket.on("custom_command_critical_error", data =>
      console.log("CRITICAL_ERROR: ", data)
    );
    socket.on("custom_command_exit", data => console.log("EXIT: ", data));

    socket.on("custom_command_data", e => {
      let outputs = this.state.outputs;

      if (!outputs[e.command]) outputs[e.command] = [];
      outputs[e.command].push(e.data);

      this.setState({ outputs });
    });

    // socket.on("custom_command_data", data => {
    //   if (this.state.commands.includes(data.command)) {
    //     console.log("TODO: handle this");
    //   } else {
    //     let outputs = this.state.outputs;
    //     outputs[data.command] = [data.data];

    //     let runningCommands = this.state.runningCommands;
    //     runningCommands[data.command] = true;

    //     this.setState(prevState => ({
    //       runningCommands,
    //       outputs
    //     }));
    //   }
    // });
    // socket.on("custom_command_error", data => {
    //   console.log(
    //     `Recieved outputs from command ${data.command}: `,
    //     data.error
    //   );
    // });
    // socket.on("custom_command_exit", data => {
    //   console.log(data);
    //   let runningCommands = this.state.runningCommands;
    //   let failedCommands = this.state.failedCommands;
    //   runningCommands[data.command] = false;
    //   if (Number(data.code) > 0) failedCommands[data.command] = true;
    //   this.setState({ runningCommands, failedCommands });
    // });
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
                className={
                  "tab " + (command == this.state.selectedTab ? "active" : "")
                }
                onClick={() => this.setActiveTab(command)}
              >
                {command.split(" ")[0]}
              </div>
            ))}
        </div>
        <div className="terminal">
          {this.state.selectedTab === "webpack" ? (
            props.logs.map(log => (
              <Markup trim={false} markup={`<div>${log}</div>`} />
            ))
          ) : this.state.selectedTab === "+" ? (
            <CommandsList state={this.state} runCommand={this.runCommand} />
          ) : (
            <CustomOutput state={this.state} />
          )}
        </div>
      </section>
    );
  }
}
