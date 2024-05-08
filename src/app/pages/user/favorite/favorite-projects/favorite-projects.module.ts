import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FavoriteProjectsComponent } from "src/app/pages/user/favorite/favorite-projects/favorite-projects.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FavoriteProjectsComponent }
    ])
  ],
  declarations: [FavoriteProjectsComponent],
  exports: [FavoriteProjectsComponent]
})
export class FavoriteProjectsModule {}
