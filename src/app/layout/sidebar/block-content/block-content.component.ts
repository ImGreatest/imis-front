import {Component, Input} from '@angular/core';

@Component({
  selector: 'block-content',
  templateUrl: './block-content.component.html',
  styleUrl: './block-content.component.less'
})
export class BlockContentComponent {
  @Input()
  statusSideBar: boolean = false;
  @Input()
  blocks: { routing: string, icon: string, title: string, onHover: boolean }[] = [];
  opacityValue: number = 1;

  changeOpacity() {
    this.opacityValue = 0;
  }
}
