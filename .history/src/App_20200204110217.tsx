import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicGrid from "./dynamic-grid/dynamicGrid";

const Data = {
  tableHeaders: [
    { label: "User Names", value: "username" },
    { label: "Emails", value: "email" },
    { label: "Phone number", value: "number" },
    { label: "Gender", value: "gender" }
  ],
  tableData: [
    { username: "U1", email: "test1@test.com", number: 123445566, gender: "M" },
    { username: "U2", email: "test2@test.com", number: 123445566, gender: "F" },
    { username: "U3", email: "test3@test.com", number: 123445566, gender: "M" },
    { username: "U4", email: "test4@test.com", number: 123445566, gender: "F" }
  ]
};

const App = () => {
  return (
    <div className="App">
      <DynamicGrid data={Data} />
    </div>
  );
};

export default App;
