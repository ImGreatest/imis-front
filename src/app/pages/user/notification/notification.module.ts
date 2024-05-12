import { NgModule } from "@angular/core";
import { NotificationComponent } from "./notification.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  TuiAvatarModule,
  TuiButtonModule,
  TuiCellModule,
  TuiSurfaceModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import { TuiScrollbarModule } from "@taiga-ui/core";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: NotificationComponent }
    ]),
    TuiTitleModule,
    TuiScrollbarModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiSurfaceModule,
    TuiCellModule,
  ],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
})
export class NotificationModule {}
