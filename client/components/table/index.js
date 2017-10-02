import { h , Component } from "preact";
import './style.scss';

import { readableBytes } from '../../helpers/utils'

export default class Table extends Component {
  render(props) {
    let modulesTable = props.data.table || [];
    return(
      <div className="table">
        <ul className="header">
          <li>
            <div className="type">All</div>
            <div className="count">{modulesTable.length}</div>
            <div className="percentage">100%</div>
          </li>
          <li className="cjs">
            <div className="type">CJS</div>
            <div className="count">{props.data.cjsCount || 0}</div>
            <div className="percentage">90%</div>
          </li>
          <li className="esm">
            <div className="type">ESM</div>
            <div className="count">{props.data.esmCount || 0}</div>
            <div className="percentage">10%</div>
          </li>
        </ul>
        <ul class="table-body two-col">
          {
            modulesTable.map(module => (
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
