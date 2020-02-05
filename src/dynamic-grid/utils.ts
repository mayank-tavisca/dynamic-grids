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
    activePane: number;
    position: PaginationLocation;
}

export interface ITableConfig {
    rows: number;
    cols: number;
    paginationEnabled: boolean;
    sortingEnabled: boolean;
}