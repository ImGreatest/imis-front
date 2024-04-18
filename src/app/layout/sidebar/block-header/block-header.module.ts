import { NgModule } from "@angular/core";
import { BlockHeaderComponent } from "./block-header.component";
import { CommonModule } from "@angular/common";
import { TuiButtonModule, TuiButtonVerticalModule } from "@taiga-ui/experimental";
import { RouterLink } from "@angular/router";


@NgModule({
	imports: [
		CommonModule,
		TuiButtonModule,
		TuiButtonVerticalModule,
		RouterLink
	],
  declarations: [BlockHeaderComponent],
  exports: [BlockHeaderComponent],
})
export class BlockHeaderModule {}
