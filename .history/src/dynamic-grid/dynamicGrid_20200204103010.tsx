import React, { FC, useEffect, useState } from "react";
import Style from "./dynamicGrid.module.scss";

interface IProps {
  data: any;
}

enum PaginationLocation {
  TOP,
  BOTTOM
}

interface IPagination {
  showPagination: boolean;
  defaultRowsCount: number;
  activePane: number;
  position: PaginationLocation;
}

interface ITableConfig {
  rows: number;
  cols: number;
  headerData: any;
  data: any;
  pagination: IPagination;
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
    (Object.keys(data.tableData[0]) || []).forEach((key: any) => {
      tableConfig.headerData.push(key);
    });
    tableConfig.data = data.tableData;
    setTableConfig(tableConfig);
    setShowTable(true);
  };

  const renderHeader = () => {
    return (
      <div className={Style.tableRow}>
        {tableConfig.headerData.map((item: any) => {
          return (
            <span className={`${Style.tableCell} ${Style.tableHeader}`}>
              {item}
            </span>
          );
        })}
      </div>
    );
  };

  const renderRow = (data: any) => {
    return Object.keys(data).map(key => {
      return (
        <span className={`${Style.tableCell} ${Style.tableHeader}`}>
          {data[key]}
        </span>
      );
    });
  };

  const renderData = () => {
    return tableConfig.data.map((item: any) => {
      return <div className={Style.tableRow}>{renderRow(item)}</div>;
    });
  };

  return (
    <div>
      Dynamic Grid
      {/* <table className={Style.table}>
        <thead>{renderHeader()}</thead>
        {renderData()}
      </table> */}
      <div className={Style.table}>
        {renderHeader()}
        {renderData()}
      </div>
    </div>
  );
};

export default DynamicGrid;
