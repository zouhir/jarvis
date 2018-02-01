import { h, Component } from "preact";
import cx from "classnames";

import "./style.scss";

const SearchButton = ({ google, stackoverflow, href = "#" }) => {
  let classes = cx(
    "superlink",
    google && "google",
    stackoverflow && "stackoverflow"
  );
  return <a className={classes} href={href} target="_blank" rel="noopener" />;
};

export default SearchButton;
