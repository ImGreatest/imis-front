export interface IUpdateCreateRole {
  name : string;
}

export interface IRole{
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IUpdatePermission {
  action : string;
  subject : string;
  inverted?: boolean;
  conditions?: {
      [key : string]: string;
  };
  reason?: string;
}
