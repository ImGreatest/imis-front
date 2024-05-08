export interface IResAuthDatas {
    access : string;
    refresh : string;
    permissions : IPermissions
}

export interface IPermissions
{
  [key : string]: {
      action: string,
      condition: null | {
          [key : string]: string
      }
  }
}