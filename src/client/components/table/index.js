import { h, Component } from "preact";
import "./style.scss";

import { readableBytes } from "../../helpers/utils";

export default class Table extends Component {
  state = {
    selected: "all"
  };
  selectModuleType = type => {
    this.setState({ selected: type });
  };
  render(props, state) {
    let table = props.data || {};
    let cjsCount = table.cjs.length || 0;
    let esmCount = table.esm.length || 0;
    let mixedCount = table.mixed.length || 0;
    let totalCount = cjsCount + esmCount + mixedCount || 0;
    let { selected } = state;
    /**
     * I am really really really sorry for this mess.
     */
    return (
      <div className="table">
        <ul className="header">
          <li
            className={state.selected === "all" ? "selected" : ""}
            name="all"
            onClick={() => this.selectModuleType("all")}
          >
            <div className="type">All Modules</div>
            <div className="count">{totalCount}</div>
            <div className="percentage">100%</div>
          </li>
          <li
            className={state.selected === "esm" ? "esm selected" : "esm"}
            name="esm"
            onClick={() => this.selectModuleType("esm")}
          >
            <div className="type">Treeshakable</div>
            <div className="count">{esmCount}</div>
            <div className="percentage">
              {Math.round(esmCount / totalCount * 100) + "%"}{" "}
            </div>
          </li>
          <li
            className={state.selected === "cjs" ? "cjs selected" : "cjs"}
            name="cjs"
            onClick={() => this.selectModuleType("cjs")}
          >
            <div className="type">Non-Treeshakable</div>
            <div className="count">{cjsCount}</div>
            <div className="percentage">
              {Math.round(cjsCount / totalCount * 100) + "%"}
            </div>
          </li>
          <li
            className={state.selected === "mixed" ? "mixed selected" : "mixed"}
            name="mixed"
            onClick={() => this.selectModuleType("mixed")}
          >
            <div className="type">Mixed Modules</div>
            <div className="count">{mixedCount}</div>
            <div className="percentage">
              {Math.round(mixedCount / totalCount * 100) + "%"}
            </div>
          </li>
        </ul>
        <ul class="table-body two-col">
          {selected === "all" || selected === "esm"
            ? table.esm.map(module => (
                <li>
                  <div className="col">
                    {module.name}
                    <div className="details" />
                  </div>
                  <div className="col">{readableBytes(module.size)}</div>
                </li>
              ))
            : null}

          {selected === "all" || selected === "mixed"
            ? table.mixed.map(module => (
                <li>
                  <div className="col">
                    {module.name}
                    <div className="details" />
                  </div>
                  <div className="col">{readableBytes(module.size)}</div>
                </li>
              ))
            : null}

          {selected === "all" || selected === "cjs"
            ? table.cjs.map(module => (
                <li>
                  <div className="col">
                    {module.name}
                    <div className="details" />
                  </div>
                  <div className="col">{readableBytes(module.size)}</div>
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}
