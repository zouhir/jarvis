import { h, Component } from "preact";

import "./style.scss";

const Warning = () => (
  <div className="warningWrapper">
    <img
      className="warning"
      src="../../assets/images/alert.svg"
      alt="warning perf budgets aren't set"
    />
    <h5>Performance budgets has not been set</h5>
    <a href="">Set One Now</a>
  </div>
);

export default class Chart extends Component {
  render(props) {
    return (
      <div className="budget unset">
        <Warning />
      </div>
    );
  }
}
