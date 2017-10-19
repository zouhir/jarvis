import { h, Component } from "preact";
import Markup from "preact-markup";

import "./style.scss";

export default class Chart extends Component {
  render(props) {
    return (
      <div className="terminal">
        {props.logs.map(log => (
          <Markup trim={false} markup={`<div>${log}</div>`} />
        ))}
      </div>
    );
  }
}
