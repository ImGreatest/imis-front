export interface IResAuthDatas {
    access : string;
    refresh : string;
    permissions : IPermissions
}

export interface IPermissions
{
  [key : string]: IAction[]
}
export interface IAction {
  action: string,
  condition: null | {
      [key : string]: string
  }
}

export interface ISubjectPermisions{
  delete: boolean ,
  create: boolean,
  read: boolean,
  update: boolean,
  deleteCondition: boolean ,
  createCondition: boolean,
  readCondition: boolean,
  updateCondition: boolean,
  
}