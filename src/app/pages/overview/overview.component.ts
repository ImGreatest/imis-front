import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {tuiFadeIn} from "@taiga-ui/core";



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less'],
  animations: [tuiFadeIn],
})
export class OverviewComponent {
  searchControl = new FormControl('', {
    nonNullable: true,
  });

  constructor() {}

  protected projectsList = [
    [
      { avatar: 'https://avatars.githubusercontent.com/u/11832552', name: "Aseprite", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: ["python", "typescript", "sass"], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552', 'https://avatars.githubusercontent.com/u/11832552']},
      { avatar: 'https://avatars.githubusercontent.com/u/11832552', name: "Swift", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: ["C++", "python"], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'] },
      { avatar: 'https://avatars.githubusercontent.com/u/11832552', name: "HyprLand", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: ["html", "python"], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'], }
    ],
    [
      { avatar: 'https://avatars.githubusercontent.com/u/11832552', name: "Aseprite", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: ["python", "typescript", "sass"], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'],},
      { avatar: 'https://avatars.githubusercontent.com/u/11832552', name: "Swift", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: ["C++", "python"], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'], },
      { avatar: 'https://avatars.githubusercontent.com/u/11832552', name: "HyprLand", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: ["html", "python"], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'], }
    ]
  ]

  expanded = false;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
