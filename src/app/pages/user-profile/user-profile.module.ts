import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {RouterModule} from "@angular/router";
import {UserProfileComponent} from "./user-profile.component";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: UserProfileComponent}
    ]),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}
