import { h, render } from "preact";

import App from './components/app';
let root = document.getElementById('app');

function init () {
  let root = render(<App />, document.body, root)
}


if(module.hot) {
  require('preact/devtools');
  
  module.hot.accept('./components/app', () => requestAnimationFrame(init));
}
init()