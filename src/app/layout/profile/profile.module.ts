import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { RouterModule } from "@angular/router";
import { TuiButtonModule, TuiTitleModule } from "@taiga-ui/experimental";
import { TuiForModule } from "@taiga-ui/cdk";
import { TuiBarModule } from "@taiga-ui/addon-charts";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'user', component: ProfileComponent }
    ]),
    TuiTitleModule,
    TuiButtonModule,
    TuiForModule,
    TuiBarModule,
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class ProfileModule {}
