import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCardComponent implements OnInit {
  @Input() name: string = 'Name';

  @Input() description: string = 'Description';

  @Input() techStack: string[] = [];
  

  @Input() address: string = 'Address';
  
  @Input() contacts: string = 'Contacts';

  readonly items: string[] = [
    'Tag',
    'Tag',
    'Tag',
    'Tag',
    'TAg',
    'Tag',
  ];
  @Input() avatar: string = ''; 
  readonly required = 3;
  
  constructor() {}

  ngOnInit() {
    console.log(this.name, this.description, this.techStack, this.address, this.contacts);
  }
  getRemaining(index: number): number {
    const offset: number = index < this.required ? index + 2 : index + 1;

    return this.items.length - offset;
  }
}