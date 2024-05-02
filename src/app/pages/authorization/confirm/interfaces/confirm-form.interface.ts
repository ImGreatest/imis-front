import { FormControl } from "@angular/forms";

export interface IConfirmForm  {
  password: FormControl<string>,
  retryPassword: FormControl<string>;
}
