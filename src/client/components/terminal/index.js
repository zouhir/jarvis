import { h, Component } from "preact";
import Markup from "preact-markup";

import "./style.scss";

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
    outputs: {},
    runningCommands: {},
    failedCommands: {},
    selectedTab: "webpack"
  };

  setActiveTab(tab) {
    this.setState({ selectedTab: tab });
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on("custom_command_data", data => {
      if (this.state.commands.includes(data.command)) {
        console.log("TODO: handle this");
      } else {
        let outputs = this.state.outputs;
        outputs[data.command] = [data.data];

        let runningCommands = this.state.runningCommands;
        runningCommands[data.command] = true;

        this.setState(prevState => ({
          commands: [...prevState.commands, data.command],
          runningCommands,
          outputs
        }));
      }
    });
    socket.on("custom_command_error", data => {
      console.log(
        `Recieved outputs from command ${data.command}: `,
        data.error
      );
    });
    socket.on("custom_command_exit", data => {
      console.log(data);
      let runningCommands = this.state.runningCommands;
      let failedCommands = this.state.failedCommands;
      runningCommands[data.command] = false;
      if (Number(data.code) > 0) failedCommands[data.command] = true;
      this.setState({ runningCommands, failedCommands });
    });
  }

  render(props) {
    return (
      <section className="terminals">
        <div className="tabs">
          {["webpack"].concat(this.state.commands).map(command => (
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
          ) : (
            <CustomOutput state={this.state} />
          )}
        </div>
      </section>
    );
  }
}
