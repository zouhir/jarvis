import { h } from "preact";
import habitat from "preact-habitat";
import Header from "./components/header";

let Main = () =>
  <div>
    <Header content="Hello, World!" />
    <Header content="Bye, World!" />
  </div>;

habitat(Main).render({
  name: "data-template",
  value: "basic",
  inline: false,
  clean: true
});
