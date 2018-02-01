import { h, Component } from "preact";
import Markup from "preact-markup";

import "./style.scss";

import SearchButton from "../search-button";

export default class Chart extends Component {
  state = {
    showActionBtn: false,
    text: null,
    googleBaseUrl: `https://www.google.com/search?q=`,
    stackBaseUrl: `https://stackoverflow.com/search?q=`
  };
  // I don't want a re-render on mouse events
  _highlightState = {
    started: false,
    mouseX: 0
  };

  highlightStart = e => {
    this._highlightState.mouseX = e.clientX;
    this._highlightState.start = true;
  };

  highlightEnd = e => {
    if (!this._highlightState.start) return;

    let _selection = window.getSelection();

    let text = _selection.toString();

    if (text.length > 0) {
      this.setState({
        showActionBtn: true,
        text: text.replace(/\s/g, "+")
      });
    } else {
      this.resetState();
    }
  };
  resetState = () => {
    this.setState({
      showActionBtn: false,
      text: ""
    });
  };

  render(props, { showActionBtn, text, googleBaseUrl, stackBaseUrl }) {
    return (
      <div
        className="terminal"
        onmousedown={this.highlightStart}
        onmouseup={this.highlightEnd}
      >
        {props.logs.map(log => (
          <Markup trim={false} markup={`<div>${log}</div>`} />
        ))}

        <div className="buttons-bar" style={{ opacity: showActionBtn ? 1 : 0 }}>
          <SearchButton google href={googleBaseUrl + text} />
          <SearchButton stackoverflow href={stackBaseUrl + text} />
        </div>
      </div>
    );
  }
}
