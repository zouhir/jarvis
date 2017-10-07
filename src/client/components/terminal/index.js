import {h, Component} from 'preact';
import Markup from 'preact-markup';

import './style.scss'

export default class Chart extends Component {
  render(props) {
    let printOut;
    if (props.errors.length > 0) {
      printOut = props.errors;
    } else {
      printOut = props.warnings.concat(props.success);  
    }
    
    return (
      <div className="terminal">
        {
          printOut.map(err => (
            <Markup trim={false} markup={`<div>${err}</div>`} />
          ))
        }
      </div>
    );
  }
}