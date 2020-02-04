import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicGrid from "./dynamic-grid/dynamicGrid";

const Data = {
  cols: 2,
  rows: 4,
  data: []
};

const App = () => {
  return (
    <div className="App">
      <DynamicGrid data={Data} />
    </div>
  );
};

export default App;
