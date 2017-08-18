import { h } from 'preact';
import { css } from 'emotion';

const redHeader = css`
  color: #f00;
  font-size: 38px;
`

const Header = ({content = 'unprovided'}) => {
  return <h1 className={redHeader}>{content}</h1>
}

export default Header;