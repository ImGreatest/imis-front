import {Component, Input} from '@angular/core';

@Component({
  selector: 'block-content',
  templateUrl: './block-content.component.html',
  styleUrl: './block-content.component.less'
})
export class BlockContentComponent {
  @Input()
  blocks: { routing: string, icon: string, title: string, onHover: boolean }[] = [];
}
