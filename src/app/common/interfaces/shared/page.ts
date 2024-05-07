export interface PageRes<T> {
  rows: T[];
  info: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface PageResRating<T> {
  rows: T[];
  info: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    minScores: number;
    maxScores: number;
  };
}

export interface PageResSort<T> {
  rows: T[];
  info: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    column: string;
    sortDirection: string;
  };
}
