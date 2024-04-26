import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RoleService } from "../../common/services/api/role.service";

@Component({
    selector: 'roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesComponent  implements OnInit{
  constructor(private roleService: RoleService) {}
  ngOnInit(): void {
      const roles = this.roleService.getPage(10,1).subscribe(val=>console.log(val))
  }

}