import { h } from "preact";
import "./style.scss";
let Nav = ({ name = "", version = "NaN", makers = "" }) => (
  <nav className="nav">
    <ul>
      <li className="project">{name}</li>
      <li className="version">{version}</li>
      <li className="makers">{makers}</li>
      <li className="snippets chuckright">snippets</li>
    </ul>
  </nav>
);

export default Nav;
