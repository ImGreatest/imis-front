export interface IScope{
    scope: [
        {
          tagId: number,
          ratingScore: number
        }
      ]
}

export interface IGetScore {
  page: number,
  pageSize: number,
  sortDirection: string,
  column: string
}