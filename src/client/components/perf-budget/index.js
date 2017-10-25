import { h, Component } from "preact";

import TypeAhead from "../typeahead";
import Table from '../table';
import countries from "../../DATA/global-speed.json";

import "./style.scss";

export default class Chart extends Component {
  state = {
    selected: countries[0],
    target: 5, // 5s is the target to be done loading
    latency: 1.6,
    warnings: []
  }
  onChange = (selected) => {
    let warnings = [];
    if(selected.internet_speed > 0.4) {
      warnings.push(`The speed you are measuring by is about ${Math.round(selected.internet_speed / 0.4)} times faster than the global average and does only represent 25% of global internet users in perfect & stable internet conditions.`);
    }
    this.setState({ selected, warnings })
  }
  render(props, state) {
    let assetsLoadingTime = (props.assetsSize / 1024) / ( (+state.selected.internet_speed * 1024) / 8 )
    let total = assetsLoadingTime + 1.6;
    return (
      <div className="budget unset">
        <TypeAhead
          items={countries}
          value={state.selected}
          onChange={this.onChange}
        />
        <ul>
          <li>
            <span>
              Country \ Connection
            </span>
            <span>
              { state.selected.country }
            </span>
          </li>

          <li>
            <span>
              Internet Speed
            </span>
            <span>
              { `${state.selected.internet_speed} mbps` }
            </span>
          </li>

          <li>
            <span className='small'>
              DNS lookup & TLS handshake
            </span>
            <span>
              { `${state.latency} seconds` }
            </span>
          </li>

          <li>
            <span>
              Loading your assets
            </span>
            <span>
              { `${assetsLoadingTime.toFixed(3)} seconds` }
            </span>
          </li>

          <li className={ total > 5 ? 'big' : 'ok' }>
            <span>
              Total
            </span>
            <span>
              { `${total.toFixed(3)} seconds` }
            </span>
          </li>
        </ul>
        {
          state.warnings.map(warning => (
            <div className="warning">
              {warning}
            </div>
          ))
        }
      </div>
    );
  }
}
