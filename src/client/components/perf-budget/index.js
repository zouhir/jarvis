import { h, Component } from "preact";
import If from "../utils/condition-component";
import memoize from "../../helpers/memoize";

import Table from "../table";
import performanceConstants from "../../DATA/global-speed.json";

import "./style.scss";

const DOWNLOAD_TIME_THRESHOLD_SECONDS = 5;

const calculatePerformance = memoize(assetsSizeInKB =>
  performanceConstants.map(datapoint => {
    const bandwidthInMbps = datapoint.internet_speed;
    const bandwidthInKBps = bandwidthInMbps * 1024 / 8;
    const rttInSeconds = datapoint.rtt / 1000;

    const totalDownloadTime = assetsSizeInKB / bandwidthInKBps + rttInSeconds;

    const isDownloadTimeOverThreshold =
      totalDownloadTime > DOWNLOAD_TIME_THRESHOLD_SECONDS;
    const timeDifferenceToThreshold =
      (isDownloadTimeOverThreshold ? "+" : "-") +
      Math.abs(totalDownloadTime - DOWNLOAD_TIME_THRESHOLD_SECONDS).toFixed(2) +
      "s";

    return {
      title: datapoint.title,
      bandwidth: `${bandwidthInMbps}mbps`,
      downloadTime: `${totalDownloadTime.toFixed(2)}s`,
      rtt: `${datapoint.rtt}ms`,
      isDownloadTimeOverThreshold,
      timeDifferenceToThreshold
    };
  })
);

export default class Chart extends Component {
  state = {
    speeds: []
  };

  render({ assetsSize }) {
    const performanceDatapoints = calculatePerformance(assetsSize);

    return (
      <div className="budget unset">
        {performanceDatapoints.map(datapoint => (
          <div className="item">
            <div className="info">
              <h5>
                {datapoint.title} <span>{datapoint.rtt} RTT</span>
              </h5>
              <div className="values">
                <label>{datapoint.bandwidth}</label>
                <div className="time">{datapoint.downloadTime}</div>
                <If
                  condition={datapoint.isDownloadTimeOverThreshold}
                  then={
                    <div className="high">
                      {datapoint.timeDifferenceToThreshold}
                    </div>
                  }
                  otherwise={
                    <div className="low">
                      {datapoint.timeDifferenceToThreshold}
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
