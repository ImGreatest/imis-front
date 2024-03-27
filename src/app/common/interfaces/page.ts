export interface PageRes<T> {
    rows: T[];
    info: {
      page: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };  
}