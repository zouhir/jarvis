import { h } from "preact";
import styled, { css, keyframes } from 'emotion/react'
import theme from '../../helpers/theme';


const BackHeader = styled('h1')`
  width: 100%;
  font-weight: 800;
  font-size: 40px;
  line-height: 30px;
  color: #31314c;
  left: -4px;
  bottom: -2px;
  position: relative;
  span {
    color: #FFF;
    font-size: 14px;
    position: absolute;
    left: 6px;
    font-weight: 400;
    top: 20px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }
`
const PercenatgeStatus = (props) => {
  
  return (
    <BackHeader>
      {props.title}
      <span>{props.status}</span>
    </BackHeader>
  )  
  
}

export default PercenatgeStatus;
