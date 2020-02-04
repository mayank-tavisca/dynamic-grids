import React, { FC, useEffect } from "react";

interface IProps {
  data: any;
}

const DynamicGrid: React.FC<IProps> = ({ data }) => {
  let tableConfig = {
    rows: 0,
    cols: 0,
    defaultRowCount: 5,
    pagination: false,
    data: []
  };

  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    tableConfig.rows = data.tableData.length;
    tableConfig.cols = Object.keys(data.tableData).length;
    tableConfig.data = data.tableData;
  };

  const renderHeader = () => {};

  const renderData = () => {};

  return (
    <div>
      Dynamic Grid
      {renderHeader()}
      {renderData()}
    </div>
  );
};

export default DynamicGrid;
