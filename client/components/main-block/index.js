import { h, Component } from "preact";
import styled, { css } from 'emotion/react'

const center = css`
  width: 100%;
  padding-top: 90px;
  h1 {
    font-size: 66px;
    text-align: center;
    width: 100%;
  }
  p {
    text-align: center;
    color: #FFF;
    width: 100%;
  }
`

const MainBlock = () => {
  switch(props.report) {
    default:
      return <h1>Hello World</h1>
  }
}

export default MainBlock;
