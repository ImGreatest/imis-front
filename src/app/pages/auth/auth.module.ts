import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "./auth.component";
import { TuiButtonModule, TuiCardModule, TuiTitleModule } from "@taiga-ui/experimental";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent }
    ]),
    TuiCardModule,
    TuiButtonModule,
    TuiTitleModule,
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
