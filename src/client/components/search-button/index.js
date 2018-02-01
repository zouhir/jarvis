import { h, Component } from "preact";
import cx from "obj-str";

import "./style.scss";

const SearchButton = ({ google, stackoverflow, href = "#" }) => {
  let cls = cx({ superlink: true, google, stackoverflow });
  return <a className={cls} href={href} target="_blank" rel="noopener" />;
};

export default SearchButton;
