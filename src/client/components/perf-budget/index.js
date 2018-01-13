import { h, Component } from "preact";

// import TypeAhead from "../typeahead";
import Table from "../table";
import data from "../../DATA/global-speed.json";

import "./style.scss";

export default class Chart extends Component {
  state = {
    speeds: []
  };
  componentDidMount() {
    this.setState({ speeds: this.calc(this.props.assetsSize) });
  }
  calc = assetsSize => {
    let bars = data.map(i => {
      let title = i.title;
      let speed = i.internet_speed + "mbps";
      let time = assetsSize / 1024 / (i.internet_speed * 1024 / 8) + i.rtt;
      time = Math.round(time);
      return {
        title,
        speed,
        time: +time,
        rtt: i.rtt
      };
    });
    return bars;
  };
  componentWillReceiveProps(newProps) {
    this.setState({ speeds: this.calc(newProps.assetsSize) });
  }
  render({ assetsSize }, { speeds }) {
    console.log(assetsSize);
    return (
      <div className="budget unset">
        {speeds.map(speed => (
          <div className="item">
            <div className="info">
              <h5>
                {speed.title} <span>{speed.rtt}ms RTT</span>
              </h5>
              <div className="values">
                <label>{speed.speed}</label>
                <div className="time">{speed.time}s</div>
                {speed.time > 5 ? (
                  <div className="high">+{speed.time - 5}s</div>
                ) : (
                  <div className="low">-{5 - speed.time}s</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
