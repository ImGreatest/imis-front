import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthService } from "../../../auth/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IPreferenceForm } from "./interfaces/preference-form.interface";

@Component({
  selector: 'block-header',
  templateUrl: './block-header.component.html',
  styleUrl: './block-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockHeaderComponent {
  open: boolean = false;
  openDialog: boolean = false;
  preferencePreLoad: boolean;
  form: FormGroup<IPreferenceForm>;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private cookieService: CookieService,
  ) {
    this.preferencePreLoad = this.cookieService.get('preference-logout-dialog') === 'true';
    this.form = this.formBuilder.group({
      preference: this.preferencePreLoad,
    });
  }

  get preference() {
    return this.form.controls.preference.value;
  }

  onClick(): void {
    this.open = !this.open;
  }

  setUpCookiePreference(): void {
    this.cookieService.put('preference-logout-dialog', String(this.preference));
  }

  async onProfile(): Promise<void> {
    if (this.authService.isAuthenticated()) {
      await this.router.navigate(['user-profile'])
    } else {
      await this.router.navigate(['auth']);
    }
  }

  async onProject(): Promise<void> {
    if (this.authService.isAuthenticated()) {
      console.log('navigate to user projects');
      // await this.router.navigate(['user-profile/projects'])
    } else {
      await this.router.navigate(['auth']);
    }
  }

  async onLogout(): Promise<void> {
    this.setUpCookiePreference();
    this.authService.logout();
    await this.router.navigate(['auth']);
  }

  async onOpen(): Promise<void> {
    if (this.cookieService.get('preference-logout-dialog') === String('true')) {
      this.authService.logout();
      await this.router.navigate(['auth']);
    } else {
      this.openDialog = true;
    }
  }

  onClose(): void {
    this.cookieService.put('preference-logout-dialog', String(false));
    if (this.preference === true) {
      this.form.controls.preference.setValue(false);
    }
    this.openDialog = false;
  }

  onObscured(obscured: boolean): void {
    if (obscured) {
      this.open = false;
    }
  }

  onActiveZone(active: boolean): void {
    this.open = active && this.open;
  }
}
