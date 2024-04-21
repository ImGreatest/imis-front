import { IFilter } from './rating';

export interface IStudentScore {
  ratingId: number;
  studentId: number;
  ratingScore: number;
  student: {
    id: number;
    name: string;
    surname: string;
    course: string;
    direction: { id: number; name: string };
    group: { id: number; name: string };
  };
}

export interface IGetScore {
  page: number;
  pageSize: number;
  orderProps: any;
  filters: IFilter[];
}
