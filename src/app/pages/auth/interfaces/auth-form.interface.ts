import { FormControl } from "@angular/forms";
import { ILogin, IPassword, IRemindMe } from "../interfaces/auth.interface";

export interface IAuthForm  {
  login: FormControl<ILogin | null>,
  password: FormControl<IPassword | null>,
  remind: FormControl<IRemindMe | null>,
}
