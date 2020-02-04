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
    pagination: false,
    sortingEnabled: false
  });

  const [tableData, setTableData]: any = useState([]);
  const [headers, setHeaders] = useState([]);
  const [sortOrder, setSortOrder] = useState();
  const [currentSortCriteria, setCurrentSortCriteria] = useState();
  //   let tableConfig: ITableConfig = ;

  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    tableConfig.rows = data.tableData.length;
    tableConfig.cols = Object.keys(data.tableData).length;
    tableConfig.sortingEnabled = data.sortingEnabled;

    setHeaders(data.headers);
    setTableData(data.tableData);
    setTableConfig(tableConfig);

    if (tableConfig.sortingEnabled) {
      console.log(data.sorting.defaultOrder.toLowerCase());

      const defaultOrder =
        data.sorting.defaultOrder.toLowerCase() === "ascending"
          ? SortOrder.ASCENDING
          : SortOrder.DESCENDING;
      setSortOrder(defaultOrder);
      setCurrentSortCriteria(data.sorting.sortBy);
    }
  };

  const renderHeader = () => {
    return (
      <div className={Style.tableRow}>
        {headers.map((item: any) => {
          return (
            <span
              onClick={
                tableConfig.sortingEnabled
                  ? () => {
                      sortTable(item.value);
                    }
                  : undefined
              }
              className={`${Style.tableCell} ${Style.tableHeader}`}
            >
              {item.label}
              {tableConfig.sortingEnabled &&
              currentSortCriteria === item.value ? (
                sortOrder === SortOrder.ASCENDING ? (
                  <span>&#8595;</span>
                ) : (
                  <span>&#8593;</span>
                )
              ) : (
                ""
              )}
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

  const evaluateSortOrder = sortCriteria => {
    if (currentSortCriteria !== sortCriteria) {
      setSortOrder(SortOrder.ASCENDING);
    } else if (sortOrder === SortOrder.ASCENDING) {
      setSortOrder(SortOrder.DESCENDING);
    } else if (sortOrder === SortOrder.DESCENDING) {
      setSortOrder(SortOrder.ASCENDING);
    }
  };

  const sortTable = (sortCriteria: string) => {
    if (tableData && tableData.length) {
      let temp = tableData.map(e => Object.assign({}, e));

      evaluateSortOrder(sortCriteria);

      if (sortOrder === SortOrder.DESCENDING) {
        temp = sortDataByDescending(temp, sortCriteria);
      } else {
        temp = sortDataByAscending(temp, sortCriteria);
      }

      setCurrentSortCriteria(sortCriteria);
      setTableData(temp);
    }
  };

  return (
    <div>
      {tableConfig.sortingEnabled ? sortTable(currentSortCriteria) : ""}
      <div className={Style.table}>
        {renderHeader()}
        {renderData()}
      </div>
    </div>
  );
};

export default DynamicGrid;
