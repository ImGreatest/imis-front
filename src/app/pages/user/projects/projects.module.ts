import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProjectsComponent } from "./projects.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ProjectsComponent}
    ]),
  ],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
