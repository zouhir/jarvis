import { h , Component } from "preact";
import './style.scss';

import { readableBytes } from '../../helpers/utils'

export default class Table extends Component {
  render(props) {
    let modulesTable = props.data.table || [];
    let modCount = modulesTable.length;
    let cjsCount = props.data.cjsCount || 0;
    let esmCount = props.data.esmCount || 0;
    return(
      <div className="table">
        <ul className="header">
          <li>
            <div className="type">All</div>
            <div className="count">{modCount}</div>
            <div className="percentage">100%</div>
          </li>
          <li className="cjs">
            <div className="type">CJS</div>
            <div className="count">{cjsCount}</div>
            <div className="percentage">{ Math.round((cjsCount / modCount) * 100) + '%' }</div>
          </li>
          <li className="esm">
            <div className="type">ESM</div>
            <div className="count">{esmCount}</div>
            <div className="percentage">{ Math.round((esmCount / modCount) * 100) + '%' } </div>
          </li>
        </ul>
        <ul class="table-body two-col">
          {
            modulesTable.map(module => (
              <li>
                <div className="col">
                  {module.name}
                  <div className={module.type === 'esm' ? 'esm' : 'cjs'}>{module.type}</div>
                </div>
                <div className="col">{readableBytes(module.size)}</div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
