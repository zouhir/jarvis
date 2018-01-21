import { h, Component } from "preact";
import ConditionWrap from "../utils";

import "./style.scss";

export default class MiniCard extends Component {
  render(props) {
    const { color, title, status, note, progress } = props;
    return (
      <div className={`mini ${color}`}>
        <div className="card-header">{title}</div>
        <h3>{status}</h3>
        <p className="note">{note}</p>
        <ConditionWrap condition={progress}>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
        </ConditionWrap>
      </div>
    );
  }
}
