import {ChangeDetectionStrategy, Component} from '@angular/core';
import {tuiFadeIn} from "@taiga-ui/core";
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class CompanyComponent {

  filters = {
    name: '',
    industry: '',
    techStack: ''
  }

  industries = ['IT', 'СМИ', 'Ритейл', 'Здравоохранение','Банки'];
  companies = [
    {
      name: 'Компания 1',
      
      industry: 'IT',
      description: 'Описание компании 1',
      techStack: ['JavaScript', 'C#'],
      address: 'г.Москва, ул.Ленина, 1',
      contacts: '8(800)555-35-35, example1@example.com',
    },
    {
      name: 'Компания 2',
      industry: 'СМИ',
      description: 'Описание компании 2',
      techStack: ['Python', 'Java'],
      address: 'г.Санкт-Петербург, просп.Невский, 2',
      contacts: '8(800)665-45-25, example2@example.com',
    },
    {
      name: 'Компания 3',
      industry: 'Ритейл',
      description: 'Описание компании 3',
      techStack: ['PHP', 'Ruby'],
      address: 'г.Казань, ул.Казанская, 3',
      contacts: '8(800)775-55-15, example3@example.com',
    },
    // Можно добавить больше компаний по этому образцу...
  ];

  originalCompanies = this.companies;

  applyFilters() {
    this.companies = this.originalCompanies.slice(); // сброс к исходным перед фильтрацией
    if(this.filters.name) {
      this.companies = this.companies.filter(c => c.name.toLowerCase().includes(this.filters.name.toLowerCase()));
    }
    if(this.filters.industry) {
      this.companies = this.companies.filter(c => c.industry.includes(this.filters.industry));
    }
    if(this.filters.techStack) {
      this.companies = this.companies.filter(c => c.techStack.some(t => t.toLowerCase() === this.filters.techStack.toLowerCase()));
    }
  }

  clearFilters() {
    this.filters = {
      name: '',
      industry: '',
      techStack: ''
    };
    this.companies = this.originalCompanies.slice();
  }

  isFilterVisible = false;

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

}