import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FavoriteComponent } from "./favorite.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: FavoriteComponent}
    ]),
  ],
  declarations: [FavoriteComponent],
  exports: [FavoriteComponent],
})
export class FavoriteModule {}
