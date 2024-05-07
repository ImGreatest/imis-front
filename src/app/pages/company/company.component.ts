import {ChangeDetectionStrategy, Component} from '@angular/core';
import {tuiFadeIn} from "@taiga-ui/core";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class CompanyComponent {
  companies = [
    {
      name: 'Название компании 1',
      description: 'Описание компании 1',
      techStack: 'Технологии 1, Технологии 2',
      address: 'Адрес компании 1',
      contacts: 'Телефон, Электронная почта',
    },
    {
      name: 'Название компании 2',
      description: 'Описание компании 2',
      techStack: 'Технологии 3, Технологии 4',
      address: 'Адрес компании 2',
      contacts: 'Телефон, Электронная почта',
    }
    // Добавьте сюда данные о дополнительных компаниях аналогичным образом
  ];
}