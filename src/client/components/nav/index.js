import { h } from "preact";
import "./style.scss";

let Nav = ({
  name = "",
  version = "NaN",
  makers = { name: "", email: "", url: "" }
}) => {
  const emailLink = makers.email ? (
    <a href={`mailto:${makers.email}`} className="nav-link">
      {makers.email}
    </a>
  ) : (
    ""
  );

  const webLink = makers.url ? (
    <a target="_blank" href={makers.url} className="nav-link">
      {makers.url}
    </a>
  ) : (
    ""
  );

  return (
    <ul className="nav">
      <li className="project">{name}</li>
      <li className="version">{version}</li>
      <li className="makers">
        <span>{makers.name}</span>
        {emailLink}
        {webLink}
      </li>
      <li className="snippets">snippets</li>
    </ul>
  );
};

export default Nav;
