import {h, Component} from 'preact';
import Markup from 'preact-markup';

import './style.scss'

export default class Chart extends Component {
  render(props) {
    console.log(props.printout[0])
    return (
      <div className="terminal">
        {
          props.printout.map(err => (
            <Markup trim={false} markup={`<div>${err}</div>`} />
          ))
        }
      </div>
    );
  }
}