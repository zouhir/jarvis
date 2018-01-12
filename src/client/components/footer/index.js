import { h, Component } from "preact";

import "./style.scss";

export default class MiniCard extends Component {
  render(props) {
    return (
      <footer>
        <div className="progress">
          <div className="wrapper">
            <div className="bar" />
          </div>
        </div>
      </footer>
    );
  }
}
