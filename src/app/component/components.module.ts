import { NgModule } from "@angular/core";
import { RatingTableModule } from "./rating-table/rating.module";
import { ProjectCardModule } from "./project-card/project-card.module";

@NgModule({
  exports: [
    ProjectCardModule,
    RatingTableModule
  ],
})
export class ComponentsModule {}
