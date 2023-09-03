import React from "react";
import "./Score.css";
import Arrow from 'react-icons/lib/fa/caret-right';

//stateless component
const Score = props => (
  <div className="gameScore">
    <h3 className="score">Your Score <Arrow /> {props.total}</h3>
    <h3 className="status">{props.status}</h3>
  </div>
);

export default Score;
