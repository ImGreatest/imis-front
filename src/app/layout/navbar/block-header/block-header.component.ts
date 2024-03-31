import {Component, Input, ViewChild} from '@angular/core';
import {SidebarComponent} from "../sidebar.component";

@Component({
  selector: 'block-header',
  templateUrl: './block-header.component.html',
  styleUrl: './block-header.component.less',
})
export class BlockHeaderComponent {
  @Input()
  statusSideBar: boolean = false;
}
