export interface IUser {
  id: number;
  email: string;
  name: string;
  surname: string;
  roleId: number;
  password: string;
  course?: number;
  direction?: number;
  group?: number;
  createdAt: Date;
  updateAt: Date;
  deleteAt: Date;
}
