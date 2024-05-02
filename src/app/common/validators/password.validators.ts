import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidators(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const matches = control.value.match(passwordRegex);
    return matches ? null : { password: true };
  }

  return null;
}
