import { FormControl } from "@angular/forms";

export interface INewPasswordForm  {
  password: FormControl<string>,
  retryPassword: FormControl<string>;
}
