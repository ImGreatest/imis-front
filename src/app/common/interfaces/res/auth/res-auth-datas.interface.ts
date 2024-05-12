export interface IResAuthDatas {
  access : string;
  refresh : string;
  permissions : IPermissions,
  email: string;
}

export interface IPermissions {
  [key: string]: IAction[];
}
export interface IAction {
  action: string;
  condition: null | {
    [key: string]: string;
  };
}

export interface ISubjectPermissions {
  delete: boolean;
  create: boolean;
  read: boolean;
  update: boolean;
  updateStatus: boolean;
  deleteCondition: boolean;
  createCondition: boolean;
  readCondition: boolean;
  updateCondition: boolean;
  updateStatusCondition: boolean;
  userId: number;
}
