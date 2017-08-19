import { h } from "preact";
import styled, { css } from 'emotion/react'
import theme from '../../helpers/theme';

const Nav = styled('nav')`
  height: 60px;
  background: ${theme.dark1};
  box-shadow: 0 4px 20px 6px rgba(0,0,0,0.09);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 15px;
  position: fixed;
  width: 100%;
  z-index: 999;
`;

const Status = styled('a')`
  color: rgba(255, 255, 255, 0.8);
  background-image: linear-gradient(-47deg, #B154F4 0%, #7D71FC 100%);
  border-radius: 4px;
  height: 40px;
  float: right;
  padding: 0px 15px;
  font-size: 14px;
  line-height: 37px;
  text-align: center;
  width: 180px;
`

const Navbar = () =>
  <Nav>
    <Status>
      Development Build
    </Status>
  </Nav>;

export default Navbar;
