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
  // const [tableData, setTableData] = useS

  //   let tableConfig: ITableConfig = ;

  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    tableConfig.rows = data.tableData.length;
    tableConfig.cols = Object.keys(data.tableData).length;
    tableConfig.headerData = data.tableHeaders;
    tableConfig.data = data.tableData;
    setTableConfig(tableConfig);
    setShowTable(true);
  };

  const renderHeader = () => {
    return (
      <div className={Style.tableRow}>
        {tableConfig.headerData.map((item: any) => {
          return (
            <span
              onClick={() => {
                sortTable(item.value);
              }}
              className={`${Style.tableCell} ${Style.tableHeader}`}
            >
              {item.label}
            </span>
          );
        })}
      </div>
    );
  };

  const renderRow = (data: any) => {
    return Object.keys(data).map(key => {
      return <span className={`${Style.tableCell}`}>{data[key]}</span>;
    });
  };

  const renderData = () => {
    return tableConfig.data.map((item: any) => {
      return <div className={Style.tableRow}>{renderRow(item)}</div>;
    });
  };

  const sortTable = (sortCriteria: string) => {
    const data = Object.assign({}, tableConfig.data);
    console.log("Before sort", data);

    data.sort((a: any, b: any) => {
      if (a[sortCriteria] < b[sortCriteria]) {
        return -1;
      } else if (a[sortCriteria] > b[sortCriteria]) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log("after sort", data);

    tableConfig.tableData = data;
    setTableConfig(tableConfig);
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
