export sortDataBy = (data: any[], sortCriteria: string) => {
    return data.sort((a: any, b: any) => {
        if (a[sortCriteria] < b[sortCriteria]) {
            return -1;
        } else if (a[sortCriteria] > b[sortCriteria]) {
            return 1;
        } else {
            return 0;
        }
    });
}
