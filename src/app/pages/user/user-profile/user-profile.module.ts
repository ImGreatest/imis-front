import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {UserProfileComponent} from "./user-profile.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UserProfileComponent },
    ]),
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}
