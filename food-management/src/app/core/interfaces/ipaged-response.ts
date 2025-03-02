export interface IPagedResponse<T> {
    pageNumber: number;
    pageSize: number;
    data: T[];
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  }
  