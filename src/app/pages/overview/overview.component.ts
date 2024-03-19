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
  favoritePrj: any[] = [];
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
      { id: 1, avatar: 'https://avatars.githubusercontent.com/u/11832552', websiteLink: '', githubLink: '', name: "Aseprite", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: [{value: "python", color: "blue"}, {value: "typescript", color: "darkblue"}], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552', 'https://avatars.githubusercontent.com/u/11832552'], favorite: false},
      { id: 2, avatar: 'https://avatars.githubusercontent.com/u/11832552', websiteLink: '', githubLink: '', name: "Swift", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: [{value: "C++", color: "pink"}, {value: "python", color: "darkblue"}], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'], favorite: false },
      { id: 3, avatar: 'https://avatars.githubusercontent.com/u/11832552', websiteLink: '', githubLink: '', name: "HyprLand", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: [{value: "Html", color: "lightpink"}, {value: "python", color: "blue"}], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'], favorite: false }
    ],
    [
      { id: 4, avatar: 'https://avatars.githubusercontent.com/u/11832552', websiteLink: '', githubLink: '', name: "Aseprite", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: [{value: "python", color: "blue"}, {value: "typescript", color: "darkblue"}], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'], favorite: false},
      { id: 5, avatar: 'https://avatars.githubusercontent.com/u/11832552', websiteLink: '', githubLink: '', name: "Swift", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: [{value: "C++", color: "pink"}, {value: "python", color: "darkblue"}], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'], favorite: false },
      { id: 6, avatar: 'https://avatars.githubusercontent.com/u/11832552', websiteLink: '', githubLink: '', name: "HyprLand", description: "Aseprite is a proprietary, source-available image editor designed primarily for pixel art drawing and animation.", tags: [{value: "Html", color: "lightpink"}, {value: "python", color: "blue"}], cotr_avatar: ['https://avatars.githubusercontent.com/u/11832552'], favorite: false }
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

  subscribePrj(prjId: number): void {
    this.favoritePrj.push(prjId);
  }

  unsubscribePrj(prjId: number): void {
    const index: number = this.favoritePrj.findIndex(value => value === prjId);
    if (index > -1) {
      this.favoritePrj.splice(index, 1);
    }
  }

}
