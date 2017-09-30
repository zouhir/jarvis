import { h, Component } from 'preact';

import './style.scss';


const ChunkList = (list) => {
  list = [{name: 'hi', size: '112'}, {name: 'hi', size: '112'}]
    return (
      <ul className="chunklist">
        {
          list.map(l => (
            <li className="chunk">
              {l.name}
              <span>
                {l.size}
              </span>
            </li>
          ))
        }
      </ul>
    )
}

export default class MiniCard extends Component {
  render(props) {
    return (
      <div className="bundle-list">
        <ul className="card">
          <li className="bundles">
            <span>bundle.js</span>
            <p className="details">
              <span>5 chunks</span>
              <span className="size big">big</span>
            </p>
            <ChunkList />
          </li>
          <li>
            hello
          </li>
          <li>
            hello
          </li>
        </ul>
      </div>
    )
  }
}