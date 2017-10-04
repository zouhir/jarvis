import { h, render } from "preact";

import App from './components/app';
import App2 from './components/app2';

let root = document.getElementById('app');

function init () {
  let root = render(<div>
      <App />
      <App2 />
    </div>, document.body, root)
}


if(module.hot) {
  require('preact/devtools');
  
  module.hot.accept('./components/app', () => requestAnimationFrame(init));
}
init()