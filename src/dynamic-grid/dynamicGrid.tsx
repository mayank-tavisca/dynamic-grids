import React, { FC, useEffect, useState } from "react";
import Style from "./dynamicGrid.module.scss";
import {
  sortDataByAscending,
  sortDataByDescending,
  ITableConfig,
  SortOrder,
  IPagination,
  PaginationLocation,
  IConfig,
  IHeader
} from "./utils";

interface IProps {
  data: IConfig;
}

const DynamicGrid: React.FC<IProps> = ({ data }) => {
  const [config, setConfig] = useState<ITableConfig>({
    rows: 0,
    cols: 0,
    paginationEnabled: false,
    sortingEnabled: false
  });

  const [paginationConfig, setPaginationConfig] = useState<IPagination>({
    defaultRowsCount: 5
  });
  const [tableData, setTableData]: any = useState([]);
  const [headers, setHeaders] = useState<IHeader[]>([]);
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
    let t: any = {};
    t.rows = data.tableData.length;
    t.cols = Object.keys(data.tableData).length;
    t.sortingEnabled = data.sortingEnabled;
    t.paginationEnabled = data.paginationEnabled;

    if (data.pagination && data.pagination.defaultRowsCount) {
      setPaginationConfig({
        defaultRowsCount: data.pagination.defaultRowsCount
      });
      setThresholdIndex({ start: 0, end: paginationConfig.defaultRowsCount });
    }

    if (data.sortingEnabled && data.sorting) {
      const defaultOrder =
        data.sorting?.defaultOrder.toLowerCase() === "ascending"
          ? SortOrder.ASCENDING
          : SortOrder.DESCENDING;
      setSortOrder(defaultOrder);
      setCurrentSortCriteria(data.sorting.sortBy);
      sortTable(currentSortCriteria);
    }

    setHeaders(data.headers);
    setTableData(data.tableData);
    setConfig(t);
  };

  const renderHeader = () => {
    return (
      <div className={Style.tableRow}>
        {headers.map((item: any) => {
          return (
            <div
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
                  <div className={Style.sortIcon}>&#8593;</div>
                ) : (
                  <div className={Style.sortIcon}>&#8595;</div>
                )
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderRow = (data: any) => {
    return Object.keys(data).map(key => {
      return <div className={`${Style.tableCell}`}>{data[key]}</div>;
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
        {Array.from(Array(totalPages).keys()).map((i: any) => {
          return (
            <div
              onClick={() => toggleToPage(i + 1)}
              className={Style.paginationLink}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    );
  };

  const toggleToPage = (pageNumber: number) => {
    setThresholdIndex({
      start: (pageNumber - 1) * paginationConfig.defaultRowsCount,
      end: pageNumber * paginationConfig.defaultRowsCount
    });
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
