import { h } from "preact";
import styled, { css, keyframes } from 'emotion/react'
import theme from '../../helpers/theme';


const panel = css`
  height: 100vh;
  width: 80px;
  position: fixed;
  background: ${theme.dark3};
  top: 0;
  left: 0;
  z-index: 100;
`;

const Sidebar = (props) => {
  
  return (
    <div className={panel}>
    </div>
  )  
  
}

export default Sidebar;
