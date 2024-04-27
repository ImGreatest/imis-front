import { IFilter } from '../shared/filter.interface';

export interface IGetPage {
  page: number;
  pageSize: number;
  orderProps: any;
  filters: IFilter[];
}
