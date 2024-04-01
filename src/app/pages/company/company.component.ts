import {ChangeDetectionStrategy, Component} from '@angular/core';
import {tuiFadeIn} from "@taiga-ui/core";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class CompanyComponent {}
