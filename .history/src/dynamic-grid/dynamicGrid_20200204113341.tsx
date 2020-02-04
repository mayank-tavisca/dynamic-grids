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
  const [tableConfig, setTableConfig]: any = useState({
    rows: 0,
    cols: 0,
    defaultRowCount: 5,
    pagination: false
  });

  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  //   let tableConfig: ITableConfig = ;

  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    tableConfig.rows = data.tableData.length;
    tableConfig.cols = Object.keys(data.tableData).length;

    setHeaders(data.headers);
    setTableData(data.tableData);
    setTableConfig(tableConfig);
  };

  const renderHeader = () => {
    return (
      <div className={Style.tableRow}>
        {headers.map((item: any) => {
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
    return tableData.map((item: any) => {
      return <div className={Style.tableRow}>{renderRow(item)}</div>;
    });
  };

  const sortTable = (sortCriteria: string) => {
    const data = tableData.map(e => Object.assign({}, e));

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
    setTableData(data);
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
