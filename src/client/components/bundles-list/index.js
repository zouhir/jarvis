import { h, Component } from "preact";
import { readableBytes } from "../../helpers/utils";

import "./style.scss";

const ChunkList = props => {
  return (
    <ul className="chunklist">
      {props.chunkNames.map((chunk, idx) => (
        <li className="chunk">
          {chunk}
          <span>-</span>
        </li>
      ))}
    </ul>
  );
};

const Asset = props => {
  let bundle = props.bundle;
  return (
    <li className="bundles">
      <span>{bundle.name}</span>
      <p className="details">
        <span>
          {bundle.chunks.length} chunks, {readableBytes(bundle.size)}
        </span>
        {bundle.isOverSizeLimit ? (
          <span className="size big">big</span>
        ) : (
          <span className="size ok">ok</span>
        )}
      </p>
      <ChunkList chunks={bundle.chunks} chunkNames={bundle.chunkNames} />
    </li>
  );
};

export default class MiniCard extends Component {
  render(props) {
    return (
      <div className="bundle-list">
        <ul className="card">
          {props.assets.map(bundle => <Asset bundle={bundle} />)}
        </ul>
      </div>
    );
  }
}
