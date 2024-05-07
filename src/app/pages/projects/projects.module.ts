import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {ProjectsComponent} from "./projects.component";
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ProjectCardModule } from "src/app/component/project-card/project-card.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ProjectsComponent}
    ]),
    ProjectCardModule, // Подключение ProjectCardModule
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [ProjectsComponent], //Убираем ProjectCardComponent из declarations
  exports: [ProjectsComponent],
})
export class ProjectsModule {}