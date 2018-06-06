import { h, Component } from "preact";
import "./style.scss";
import If from "../utils/condition-component";

import { readableBytes } from "../../helpers/utils";

export default class Table extends Component {
  state = {
    selected: "all",
    sortBy: "name"
  };
  selectModuleType = type => {
    this.setState({ selected: type });
  };
  selectSortMode = mode => {
    this.setState({ sortBy: mode });
  };
  sortData = (a, b) => {
    if (this.state.sortBy === "size") {
      return b.size - a.size;
    }
    return a - b;
  };
  render(props, state) {
    let data = props.data || {};
    let { selected } = state;
    let allData = [...data.cjs, ...data.esm, ...data.mixed];
    let currentData = selected === "all" ? allData : data[selected];
    let sortedData = currentData.sort(this.sortData);
    let cjsCount = data.cjs.length || 0;
    let esmCount = data.esm.length || 0;
    let mixedCount = data.mixed.length || 0;
    let totalCount = allData.length || 0;

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
          <div>
            {sortedData.map(module => (
              <li>
                <div className="col">
                  {module.name}
                  <div className="details" />
                </div>
                <div className="col">{readableBytes(module.size)}</div>
              </li>
            ))}
          </div>
        </ul>
        <div className="sort-buttons">
          <h5>Sort by:</h5>
          <button
            className={state.sortBy === "name" ? "button selected" : "button"}
            onClick={() => this.selectSortMode("name")}
          >
            Name
          </button>
          <button
            className={state.sortBy === "size" ? "button selected" : "button"}
            onClick={() => this.selectSortMode("size")}
          >
            Size
          </button>
        </div>
      </div>
    );
  }
}
