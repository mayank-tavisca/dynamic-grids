import React, { FC, useEffect, useState } from "react";

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
  const [showTable, setShowTable]: any = useState(false);
  const [tableConfig, setTableConfig]: any = useState({
    rows: 0,
    cols: 0,
    defaultRowCount: 5,
    pagination: false,
    headerData: [],
    data: []
  });

  //   let tableConfig: ITableConfig = ;

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
    setTableConfig(tableConfig);
    setShowTable(true);
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
