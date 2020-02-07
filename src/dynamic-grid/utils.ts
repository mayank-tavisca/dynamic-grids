export const sortDataByAscending = (data: any[], sortCriteria: string) => {
    data = data.sort((a: any, b: any) => {
        if (a[sortCriteria] < b[sortCriteria]) {
            return -1;
        } else if (a[sortCriteria] > b[sortCriteria]) {
            return 1;
        } else {
            return 0;
        }
    });
    return data;
}

export const sortDataByDescending = (data: any[], sortCriteria: string) => {
    data = data.sort((a: any, b: any) => {
        if (a[sortCriteria] < b[sortCriteria]) {
            return 1;
        } else if (a[sortCriteria] > b[sortCriteria]) {
            return -1;
        } else {
            return 0;
        }
    });
    return data;
}

export enum PaginationLocation {
    TOP,
    BOTTOM
}

export enum SortOrder {
    ASCENDING,
    DESCENDING
}

export interface IPagination {
    defaultRowsCount: number;
}

export interface ISorting {
    defaultOrder: string;
    sortBy: string;
}

export interface ITableConfig {
    rows: number;
    cols: number;
    paginationEnabled: boolean;
    sortingEnabled: boolean;
}

export interface IHeader {
    label: string;
    value: string;
}


export interface IConfig {
    headers: IHeader[];
    tableData: any[];
    paginationEnabled?: boolean;
    pagination?: IPagination;
    sortingEnabled?: boolean;
    sorting?: ISorting;
}