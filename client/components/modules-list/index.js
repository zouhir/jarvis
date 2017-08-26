import { h, Component } from "preact";
import styled, { css } from 'emotion/react'
import theme from '../../helpers/theme';

import {readableBytes} from '../../helpers/utils';

const UL = styled('ul')`
  list-style: none;
  width: 100%;
  padding: 0px;
  margin: 0;
  overflow-y: scroll;
  max-height: 256px;
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
      text-align: center;
    }
    .name {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
      text-align: left;
    }
  }
`;

const header = css`
  background: rgb(69, 66, 112);
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.6;
`;

const Brief = styled('div')`
width: 100%;
background: #000;
padding: 12px 15px 8px 15px;
background: rgba(69, 66, 112, 0.9);
div {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 1;
  color: #FFF;
  height: 20px;
  width: 100%;
  display: flex;
  span:last-child {
    flex: none;
    margin-left: auto;
  }
}
`

class AssetsList extends Component {
  countModules = (modules) => {
    let count = {
      esm: 0,
      cjs: 0
    }
    modules.forEach((module) => {
      module.required.forEach(requiree => {
        if(requiree.type === 'esm') {
          count.esm++
        } else {
          count.cjs++
        }
      })
    })
    return count;
  }
  render({modules}){
    let count = this.countModules(modules);
    return (
      <div>
        <Brief>
          <div>
            <span>total assets: </span>
            <span>{modules.length}</span>
          </div>
          <div>
            <span>Total ES6 imports:</span>
            <span>{count.esm}</span>
          </div>
          <div>
            <span>Total CJS, AMD Required:</span>
            <span>{count.cjs}</span>
          </div>
        </Brief>
        <UL>
          <li className={header}>
            <div className='name'>Name</div>
            <span>Size</span>
          </li>
          {
            modules.map(
              module => 
              <li>
                <div className='name'>{module.name}</div>
                <span>{readableBytes(module.size)}</span>
              </li>
            )
          }
        </UL>
      </div>
    )
  }
}

export default AssetsList;
