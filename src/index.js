import { h, render } from "preact";
import "./styles/index.scss";

import App from "./components/app";

let root;

function init() {
  root = render(<App />, document.getElementById("app"), root);
}

if (module.hot) {
  require("preact/devtools");
  module.hot.accept('./components/app', init);
}

init();
