import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  TUI_SANITIZER,
} from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { NoticeComponent } from "../notice/notice.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: NoticeComponent}
    ]),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [NoticeComponent],
  exports: [NoticeComponent],
})
export class NoticeModule {}
