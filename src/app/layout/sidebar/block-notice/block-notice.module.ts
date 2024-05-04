import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  TuiAvatarLabeledModule,
  TuiAvatarModule,
  TuiButtonModule,
  TuiButtonVerticalModule
} from "@taiga-ui/experimental";
import { RouterLink } from "@angular/router";
import { TuiModeModule } from "@taiga-ui/core";
import { BlockNoticeComponent } from "./block-notice.component";

@NgModule({
  imports: [
    CommonModule,
    TuiButtonModule,
    RouterLink,
    TuiButtonVerticalModule,
    TuiAvatarLabeledModule,
    TuiAvatarModule,
    TuiModeModule,
  ],
  declarations: [BlockNoticeComponent],
  exports: [BlockNoticeComponent],
})
export class BlockNoticeModule {}
