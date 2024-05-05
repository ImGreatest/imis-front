import { NgModule } from "@angular/core";
import { BlockHeaderComponent } from "./block-header.component";
import { CommonModule } from "@angular/common";
import { TuiAvatarModule, TuiButtonModule, TuiButtonVerticalModule } from "@taiga-ui/experimental";
import { RouterLink } from "@angular/router";
import { TuiDialogModule, TuiDropdownModule } from "@taiga-ui/core";
import { TuiActiveZoneModule, TuiObscuredModule } from "@taiga-ui/cdk";
import { TuiCheckboxLabeledModule, TuiIslandModule } from "@taiga-ui/kit";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiButtonVerticalModule,
    RouterLink,
    TuiDropdownModule,
    TuiObscuredModule,
    TuiActiveZoneModule,
    TuiIslandModule,
    TuiAvatarModule,
    ReactiveFormsModule,
    TuiDialogModule,
    TuiCheckboxLabeledModule,
  ],
  declarations: [BlockHeaderComponent],
  exports: [BlockHeaderComponent],
})
export class BlockHeaderModule {}
