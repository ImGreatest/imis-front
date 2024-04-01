import {NgModule} from "@angular/core";
import {
  TuiButtonModule, TuiAvatarLabeledModule, TuiButtonVerticalModule,
} from '@taiga-ui/experimental';
import {TuiAvatarModule} from "@taiga-ui/kit";
import {CommonModule} from "@angular/common";
import {BlockContentComponent} from "./block-content.component";
import {RouterLink} from "@angular/router";



@NgModule({
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiAvatarLabeledModule,
    TuiButtonVerticalModule,
    TuiButtonModule,
    RouterLink,
  ],
  declarations: [BlockContentComponent],
  exports: [
    BlockContentComponent
  ],
})
export class BlockContentModule {}
