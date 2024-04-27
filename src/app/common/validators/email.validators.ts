import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidators(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value) {
    const matches = control.value.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    return matches ? null : { email: true };
  }

  return null;
}
