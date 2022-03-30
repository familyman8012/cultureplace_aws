import React, { useState } from "react";

function About() {
  return (
    <ul className="list">
      <ListItem />
      <ListItem />
    </ul>
  );
}

function ListItem() {
  const [show, setShow] = React.useState(false);

  return (
    <li className={`list-item ${show ? "on" : ""}`}>
      <button onClick={() => setShow(prev => !prev)}>Toggle</button>
    </li>
  );
}

export default About;
