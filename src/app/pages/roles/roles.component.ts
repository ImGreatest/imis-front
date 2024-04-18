import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesComponent  {}