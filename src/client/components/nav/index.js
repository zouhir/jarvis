import { h } from "preact";
import "./style.scss";
let Nav = ({
  name = "",
  version = "NaN",
  makers = { name: "", email: "", url: "" }
}) => {
  const emailLink = makers.email ? (
    <a href={`mailto:${makers.email}`}>{makers.email}</a>
  ) : (
    ""
  );
  const webLink = makers.url ? (
    <a target="_blank" href={makers.url}>
      {makers.url}
    </a>
  ) : (
    ""
  );
  return (
    <nav className="nav">
      <ul>
        <li className="project">{name}</li>
        <li className="version">{version}</li>
        <li className="makers">
          <span>{makers.name}</span>
          {emailLink}
          {webLink}
        </li>
        <li className="snippets chuckright">snippets</li>
      </ul>
    </nav>
  );
};

export default Nav;
