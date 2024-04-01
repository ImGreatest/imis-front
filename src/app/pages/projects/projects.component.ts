import {ChangeDetectionStrategy, Component} from '@angular/core';
import {tuiFadeIn} from "@taiga-ui/core";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class ProjectsComponent {}
