import React, { FC, useEffect } from "react";

interface IProps {
  data: any;
}

interface ITableConfig {
  rows: number;
  cols: number;
  defaultRowCount: number;
  pagination: boolean;
  headerData: any;
  data: any;
}

const DynamicGrid: React.FC<IProps> = ({ data }) => {
  let tableConfig: ITableConfig = {
    rows: 0,
    cols: 0,
    defaultRowCount: 5,
    pagination: false,
    headerData: [],
    data: []
  };

  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    tableConfig.rows = data.tableData.length;
    tableConfig.cols = Object.keys(data.tableData).length;
    Object.keys(data.tableData).forEach((key: any) => {
      tableConfig.headerData.push(key);
    });
    tableConfig.data = data.tableData;
  };

  const renderHeader = () => {
    return tableConfig.headerData.map((item: any) => {
      return <span>{item}</span>;
    });
  };

  const renderData = () => {
    return tableConfig.data.map((item: any) => {
      return <span>{item}</span>;
    });
  };

  return (
    <div>
      Dynamic Grid
      {renderHeader()}
      {renderData()}
    </div>
  );
};

export default DynamicGrid;
