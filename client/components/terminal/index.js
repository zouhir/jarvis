import {h, Component} from 'preact';
import Markup from 'preact-markup';

import './style.scss'

export default class Chart extends Component {
  render(props) {
    return (
      <div className="terminal">
        {
          props.printout.map(err => (
            <Markup trim={false} markup={err} />
          ))
        }
      </div>
    );
  }
}