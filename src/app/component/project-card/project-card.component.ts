import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnInit{
  @Input()
  title: string = 'Title';

  @Input()
  description: string = 'Description';

  @Input()
  avatar: string = 'tuiIconUser';

  @Input()
  projectTags: string[] = [];

  @Input()
  usedLanguages: string[] = [];

  @Input()
  customLink: string = '';

  @Input()
  gitLink: string = '';

  @Input()
  members: string[] = [];

  readonly items: string[] = [
    'Tag',
    'Tag',
    'Tag',
    'Tag',
    'TAg',
    'Tag',
  ];

  readonly required = 3;
  protected selectedUser: string = ''

  constructor() {}

  ngOnInit() {
    console.log(this.title, this.description, this.avatar, this.projectTags, this.customLink, this.gitLink, this.members);
  }

  selectOption(item: string): void {
    this.selectedUser = item.toString();
  }

  getRemaining(index: number): number {
    const offset: number = index < this.required ? index + 2 : index + 1;

    return this.items.length - offset;
  }
}
