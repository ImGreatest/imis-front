import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import { ALWAYS_FALSE_HANDLER } from "@taiga-ui/cdk";
import {tuiFadeIn} from "@taiga-ui/core";



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class OverviewComponent {
  favoritePrj: any[] = [];
  protected length: number = 64;
  protected index: number = 0;
  readonly items: string[] = [
    'Tag',
    'Tag',
    'Tag',
    'Tag',
    'TAg',
    'Tag',
  ];

  readonly required = 3;
  onHoverProjectTags: boolean = false

  dataTable: Array<Record<string, number | string>> = this.tableDatas;
  searchProjectControl = new FormControl('', {
    nonNullable: true,
  });

  searchRatingControl = new FormControl('', {
    nonNullable: true,
  })

  constructor() {}

  readonly names = ['Jason Statham', 'Silvester Stallone', 'Jackie Chan'];
  readonly testTags = ['Python', 'C++', 'C#', 'SCSS', 'CSS', 'Java', 'Rust', 'Swift'];
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

  getRemaining(index: number): number {
    const offset = index < this.required ? index + 2 : index + 1;

    return this.items.length - offset;
  }
}
