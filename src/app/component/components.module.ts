import { NgModule } from '@angular/core';
import { RatingTableModule } from './rating-table/rating.module';
import { ProjectCardModule } from './project-card/project-card.module';
import { CompanyCardModule } from './company-card/company-card.module';
import { AppDialogModule } from './dialog/app-dialog.module';
@NgModule({
  exports: [ProjectCardModule,CompanyCardModule, RatingTableModule, AppDialogModule],
})
export class ComponentsModule {}
