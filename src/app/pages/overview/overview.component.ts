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
  protected length: number = 64;
  protected index: number = 0;
  dataTable: Array<Record<string, number | string>> = this.tableDatas;
  searchProjectControl = new FormControl('', {
    nonNullable: true,
  });

  searchRatingControl = new FormControl('', {
    nonNullable: true,
  })

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

  get tableDatas() {
    let data = [];
    for (let i = 0; i<12; i++) {
      data.push({id: i + 1, name: 'name', rating: i + 100})
    }
    return data
  }

  get columns(): string[] {
    return Object.keys(this.dataTable[0])
  }

  goToPage(index: number): void {
    this.index = index
  }

}
