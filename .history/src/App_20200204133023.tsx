import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicGrid from "./dynamic-grid/dynamicGrid";

const Data1 = {
  headers: [
    { label: "User Names", value: "username" },
    { label: "Emails", value: "email" },
    { label: "Phone number", value: "number" },
    { label: "Gender", value: "gender" }
  ],
  tableData: [
    {
      username: "U1",
      email: "4test1@test.com",
      number: 6123445566,
      gender: "M"
    },
    {
      username: "U2",
      email: "3test2@test.com",
      number: 3123445566,
      gender: "F"
    },
    {
      username: "U3",
      email: "1test3@test.com",
      number: 2123445566,
      gender: "M"
    },
    {
      username: "U4",
      email: "2test4@test.com",
      number: 9123445566,
      gender: "F"
    }
  ],
  styles: {},
  pagination: {},
  sortingEnabled: true,
  sorting: {
    defaultOrder: "ascending",
    sortBy: "email"
  }
};

const App = () => {
  return (
    <div className="App">
      <DynamicGrid data={Data1} />
    </div>
  );
};

export default App;
