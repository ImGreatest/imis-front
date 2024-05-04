import {NgModule} from "@angular/core";
import {
  TuiButtonModule, TuiAvatarLabeledModule, TuiButtonVerticalModule,
} from '@taiga-ui/experimental';
import {TuiAvatarModule} from "@taiga-ui/kit";
import {CommonModule} from "@angular/common";
import {BlockContentComponent} from "./block-content.component";
import {RouterLink} from "@angular/router";
import { TuiScrollbarModule } from "@taiga-ui/core";

@NgModule({
	imports: [
		CommonModule,
		TuiAvatarModule,
		TuiAvatarLabeledModule,
		TuiButtonVerticalModule,
		TuiButtonModule,
		RouterLink,
		TuiScrollbarModule,
	],
  declarations: [BlockContentComponent],
  exports: [
    BlockContentComponent
  ],
})
export class BlockContentModule {}
