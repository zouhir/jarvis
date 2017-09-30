import { h , Component } from "preact";
import './style.scss';


export default class Table extends Component {
  render() {
    return(
      <div className="table">
        <ul className="header">
          <li>
            <div className="type">All</div>
            <div className="count">100</div>
            <div className="percentage">100%</div>
          </li>
          <li className="esm">
            <div className="type">CJS</div>
            <div className="count">90</div>
            <div className="percentage">90%</div>
          </li>
          <li className="cjs">
            <div className="type">ESM</div>
            <div className="count">10</div>
            <div className="percentage">10%</div>
          </li>
        </ul>
        <ul class="table-body two-col">
          <li>
            <div className="col">asdkauhsdaksdaskd</div>
            <div className="col">21</div>
          </li>
        </ul>
      </div>
    )
  }
}
