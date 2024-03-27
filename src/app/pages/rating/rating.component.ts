import {ChangeDetectionStrategy, Component} from '@angular/core';



interface User {
    readonly email: string;
    readonly name: string;
}



@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  readonly columns = ['number', 'name', 'email', 'actions'];
  readonly length: number = 64;
  protected index: number = 0;

  users: readonly User[] = [
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@montypython.com',
    },
  ];

  remove(item: User): void {
      this.users = this.users.filter(user => user !== item);
  }

  goToPage(index: number): void {
    this.index = index
  }
}
