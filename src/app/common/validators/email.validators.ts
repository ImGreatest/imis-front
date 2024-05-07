import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidators(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value) {
    const passwordRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const matches = control.value.match(passwordRegex);
    return matches ? null : { email: true };
  }

  return null;
}
