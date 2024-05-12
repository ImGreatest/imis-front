import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { RouterModule } from "@angular/router";
import { TuiButtonModule, TuiTitleModule } from "@taiga-ui/experimental";
import { TuiActiveZoneModule, TuiForModule, TuiObscuredModule } from "@taiga-ui/cdk";
import { TuiBarModule } from "@taiga-ui/addon-charts";
import { TuiDropdownModule } from "@taiga-ui/core";

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
    TuiDropdownModule,
    TuiActiveZoneModule,
    TuiObscuredModule,
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class ProfileModule {}
