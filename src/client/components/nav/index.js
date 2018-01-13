import { h } from "preact";
import "./style.scss";
let Nav = ({ name = "", version = "NaN", makers = "" }) => (
  <nav className="nav">
    <h5>
      Project: {name} <span>–</span> Version: {version} <span>–</span> Makers:{" "}
      {makers}
    </h5>
  </nav>
);

export default Nav;
