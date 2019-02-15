import React from "react";
import "./Wrapper.css";

//stateless component
const Wrapper = props => <div className="wrapper">{props.children}</div>;

export default Wrapper;
