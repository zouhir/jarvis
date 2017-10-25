import { h, Component } from "preact";

import Select from "react-select";
import "./style.scss";

class TypeAhead extends Component {
  render({ onChange, items, value }) {
    return (
      <Select
        name="form-field-name"
        value={value}
        options={items}
        labelKey="country"
        valueKey="id"
        onChange={onChange}
      />
    );
  }
}

export default TypeAhead;
