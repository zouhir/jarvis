import { h, Component } from "preact";

import "./style.scss";

export default class MiniCard extends Component {
  render(props) {
    return (
      <div className={`mini ${props.color}`}>
        <div className="card-header">{props.title}</div>
        <h3>{props.status}</h3>
        <p className="note">{props.note}</p>
        {props.progress ? (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${props.progress}%` }} />
          </div>
        ) : null}
      </div>
    );
  }
}
