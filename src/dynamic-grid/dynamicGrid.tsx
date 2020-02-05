import React, { FC, useEffect, useState } from "react";
import Style from "./dynamicGrid.module.scss";
import {
  sortDataByAscending,
  sortDataByDescending,
  ITableConfig,
  SortOrder,
  IPagination,
  PaginationLocation
} from "./utils";

interface IProps {
  data: any;
}

const DynamicGrid: React.FC<IProps> = ({ data }) => {
  const [config, setConfig] = useState<ITableConfig>({
    rows: 0,
    cols: 0,
    paginationEnabled: false,
    sortingEnabled: false
  });

  const [paginationConfig, setPaginationConfig] = useState<IPagination>({
    defaultRowsCount: 3,
    activePane: 1,
    position: PaginationLocation.BOTTOM
  });
  const [tableData, setTableData]: any = useState([]);
  const [headers, setHeaders] = useState([]);
  const [sortOrder, setSortOrder] = useState(SortOrder.ASCENDING);
  const [currentSortCriteria, setCurrentSortCriteria] = useState("");
  const [thresholdIndex, setThresholdIndex]: any = useState({});

  useEffect(() => {
    parseData();
    sortTable(currentSortCriteria);
  }, []);

  useEffect(() => {
    sortTable(currentSortCriteria);
  }, [currentSortCriteria]);

  const parseData = () => {
    config.rows = data.tableData.length;
    config.cols = Object.keys(data.tableData).length;
    config.sortingEnabled = data.sortingEnabled;
    config.paginationEnabled = data.paginationEnabled;
    setHeaders(data.headers);
    setTableData(data.tableData);
    setConfig(config);

    if (config.sortingEnabled) {
      console.log(data.sorting.defaultOrder.toLowerCase());

      const defaultOrder =
        data.sorting.defaultOrder.toLowerCase() === "ascending"
          ? SortOrder.ASCENDING
          : SortOrder.DESCENDING;
      setSortOrder(defaultOrder);
      setCurrentSortCriteria(data.sorting.sortBy);
    }
    if (config.paginationEnabled) {
      setThresholdIndex({ start: 0, end: paginationConfig.defaultRowsCount });
    }
  };

  const renderHeader = () => {
    return (
      <div className={Style.tableRow}>
        {headers.map((item: any) => {
          return (
            <span
              onClick={
                config.sortingEnabled
                  ? () => {
                      sortTable(item.value);
                    }
                  : undefined
              }
              className={`${Style.tableCell} ${Style.tableHeader}`}
            >
              {item.label}
              {config.sortingEnabled && currentSortCriteria === item.value ? (
                sortOrder === SortOrder.ASCENDING ? (
                  <span>&#8593;</span>
                ) : (
                  <span>&#8595;</span>
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
    return tableData.map((item: any, index: number) => {
      if (
        config.paginationEnabled &&
        (index < thresholdIndex.start || index + 1 > thresholdIndex.end)
      ) {
        return;
      } else {
        return <div className={Style.tableRow}>{renderRow(item)}</div>;
      }
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

  const renderPagination = () => {
    const totalRows = tableData.length;
    const totalPages = Math.ceil(totalRows / paginationConfig.defaultRowsCount);

    return (
      <div className={Style.paginatioContainer}>
        <span className={Style.paginationLink}>Prev</span>
        {Array.from(Array(totalPages).keys()).map((i: any) => {
          return (
            <span
              onClick={() => toggleToPage(i + 1)}
              className={Style.paginationLink}
            >
              {i + 1}
            </span>
          );
        })}
        <span className={Style.paginationLink}>Next</span>
      </div>
    );
  };

  const toggleToPage = (pageNumber: number) => {
    console.log(pageNumber);
    console.log(paginationConfig.defaultRowsCount);
    setThresholdIndex({
      start: (pageNumber - 1) * paginationConfig.defaultRowsCount,
      end: pageNumber * paginationConfig.defaultRowsCount
    });
    console.log(thresholdIndex);
  };

  return (
    <div>
      <div className={Style.table}>
        {renderHeader()}
        {renderData()}
      </div>
      {config.paginationEnabled ? renderPagination() : ""}
    </div>
  );
};

export default DynamicGrid;
