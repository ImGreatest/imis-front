import { FormControl } from "@angular/forms";
import { ILogin, IPassword, IRemindMe } from "src/app/pages/authorization/auth/interfaces/auth.interface";

export interface IAuthForm  {
  login: FormControl<string>,
  password: FormControl<string>,
  remind: FormControl<boolean | null>,
}
