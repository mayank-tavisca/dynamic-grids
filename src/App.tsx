import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicGrid from "./dynamic-grid/dynamicGrid";
import { IConfig } from "./dynamic-grid/utils";

const Data1: IConfig = {
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
    },
    {
      username: "U5",
      email: "3test2@test.com",
      number: 3123445566,
      gender: "F"
    },
    {
      username: "U6",
      email: "1test3@test.com",
      number: 2123445566,
      gender: "M"
    },
    {
      username: "U7",
      email: "2test4@test.com",
      number: 9123445566,
      gender: "F"
    }
  ],
  paginationEnabled: true,
  pagination: {
    defaultRowsCount: 5
  },
  sortingEnabled: true,
  sorting: {
    defaultOrder: "ascending",
    sortBy: "username"
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
