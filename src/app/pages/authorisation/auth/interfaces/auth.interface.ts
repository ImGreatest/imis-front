
export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  access: string;
  refresh: string;
}

export interface ILogin {
  login: string;
}

export interface IPassword {
  password: string;
}

export interface IRemindMe {
  remind: boolean;
}
