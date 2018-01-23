import { h } from "preact";

const If = ({ condition, then, otherwise }) =>
  !!condition ? then || null : otherwise || null;

export default If;
