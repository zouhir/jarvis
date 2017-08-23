import { h, Component } from "preact";
import styled, { css } from 'emotion/react'
import theme from '../../helpers/theme';

import {readableBytes} from '../../helpers/utils';

const UL = styled('ul')`
  list-style: none;
  width: 100%;
  padding: 0px;
  margin: 0;
  li {
    height: 40px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    color: #FFF;
    font-size: 13px;
    &.subheader: {background: rgba(44, 44, 71, 0.3);}
    span {
      display: inline-block;
      width: 20%;
    }
    .name {
      width: 40%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
    }
  }
`;

const header = css`
  background: rgb(69, 66, 112);
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;
`;

class AssetsList extends Component {
  render({assets}){
    return (
      <UL>
        <li className={header}>
          <div className='name'>Name</div>
          <span>Size</span>
          <span>Chunks</span>
          <span></span>
        </li>
        {
          assets.map(
            asset => 
            <li>
              <div className='name'>{asset.name}</div>
              <span>{readableBytes(asset.size)}</span>
              <span>{asset.chunks[0]}</span>
            </li>
          )
        }
      </UL>
    )
  }
}

export default AssetsList;
