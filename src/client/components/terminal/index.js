import { h, Component } from "preact";
import Markup from "preact-markup";

import "./style.scss";

class CustomOutput extends Component {
  render({ state }) {
    return (
      <div>
        <span>$ {state.selectedTab}</span>
        <br />
        <br />
        {state.output[state.selectedTab] &&
          state.output[state.selectedTab].map(output => <div>{output}</div>)}
      </div>
    );
  }
}

export default class Chart extends Component {
  state = {
    commands: [],
    output: {},
    selectedTab: "webpack"
  };

  setActiveTab(tab) {
    this.setState({ selectedTab: tab });
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on("custom_command_data", data => {
      if (this.state.commands.includes(data.command))
        console.log("TODO: handle this");
      else {
        let output = this.state.output;
        output[data.command] = [data.data];
        this.setState(prevState => ({
          commands: [...prevState.commands, data.command],
          output
        }));
        console.log(this.state.commands);
      }
    });
    socket.on("custom_command_error", data => {
      console.log(`Recieved output from command ${data.command}: `, data.error);
    });
    socket.on("custom_command_exit", data => {
      console.log(`Command ${data.command} exited with code ${data.code}`);
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
