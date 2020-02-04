import React, { FC, useEffect, useState } from "react";
import Style from "./dynamicGrid.module.scss";
import { sortDataByAscending, sortDataByDescending } from "../shared/utils";

interface IProps {
  data: any;
}

enum PaginationLocation {
  TOP,
  BOTTOM
}

enum SortOrder {
  ASCENDING, 
  DESCENDING
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

  const [tableData, setTableData]: any = useState([]);
  const [headers, setHeaders] = useState([]);

  const [sortOrder, setSortOrder] = useState(SortOrder.ASCENDING);
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
    let temp = tableData.map(e => Object.assign({}, e));
    
    if(sortOrder === SortOrder.ASCENDING) {      
      temp = sortDataByDescending(temp, sortCriteria);
      setSortOrder(SortOrder.DESCENDING)
    } else {
      temp = sortDataByAscending(temp, sortCriteria);
      setSortOrder(SortOrder.DESCENDING
    }

    console.log("after sort", temp);
    setTableData(temp);
  };

  return (
    <div>
      <div className={Style.table}>
        {renderHeader()}
        {renderData()}
      </div>
    </div>
  );
};

export default DynamicGrid;
 