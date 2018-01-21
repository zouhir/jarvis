import { h, Component } from "preact";
import { readableBytes } from "../../helpers/utils";
import ConditionWrap from "../utils";

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
        <ConditionWrap
          condition={bundle.isOverSizeLimit}
          otherwise={<span className="size ok">ok</span>}
        >
          <span className="size big">big</span>
        </ConditionWrap>
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
