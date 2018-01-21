import { h } from "preact";

const ConditionWrap = ({ condition, children, otherwise }) =>
  !!condition ? children || null : otherwise || null;

export default ConditionWrap;
