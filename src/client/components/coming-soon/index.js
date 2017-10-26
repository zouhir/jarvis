import { h, Component } from 'preact';

import './style.scss';

export default class MiniCard extends Component {
  render(props) {
    return (
      <div className="coming-soon">
        Coming Soon
      </div>
    );
  }
}