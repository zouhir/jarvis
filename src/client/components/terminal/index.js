import { h, Component } from "preact";
import Markup from "preact-markup";

import "./style.scss";

export default class Chart extends Component {
  state = {
    commands: []
  };

  setActiveTab(tab) {
    console.log(tab);
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on("custom_command_data", data => {
      if (this.state.commands.includes(data.command))
        console.log("TODO: handle this");
      else {
        this.setState(prevState => ({
          commands: [...prevState.commands, data.command]
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
          {this.state.commands.map(command => (
            <div className="tab" onClick={() => this.setActiveTab(command)}>
              {command.split(" ")[0]}
            </div>
          ))}
        </div>
        <div className="terminal">
          {props.logs.map(log => (
            <Markup trim={false} markup={`<div>${log}</div>`} />
          ))}
        </div>
      </section>
    );
  }
}
