import { h , Component } from "preact";
import './style.scss';

import { readableBytes } from '../../helpers/utils'

export default class Table extends Component {
  render(props) {
    console.log(props.data)
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
          {
            props.data.map(module => (
              <li>
                <div className="col">{module.name}</div>
                <div className="col">{readableBytes(module.size)}</div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
