import { h, Component } from "preact";
import cx from "classnames";

const Widget = ({ children, desktop, tablet, mobile }) => {
  return (
    <div className={`col-lg-${desktop} col-lg-${tabelt} col-lg-${mobile}`}>
      {children}
    </div>
  );
};

export default Widget;
