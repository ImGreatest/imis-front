import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  showFilter: boolean = false;
  originalProjects: any;  // Добавляю новое свойство для хранения исходного списка проектов

  filters = {
    title: '',
    language: ''
  };

  languages = ['JavaScript', 'Python', 'Java', 'C#', 'PHP'];
  projects = [
    { 
      title: 'Тестовый проект',
      description: 'Тестирование вывода проектов',
      avatar: 'tuiIconUserLarge',
      projectTags: ['Tag1', 'Tag2'],
      usedLanguages: ['JavaScript'],
      customLink: '/custom/link1',
      gitLink: '/git/link1',
      members: ['Jason Statham', 'Silvester Stallone', 'Jackie Chan'],
    },
    { 
      title: 'Проект 2',
      description: 'Описание 2',
      avatar: 'tuiIconUserLarge',
      projectTags: ['Tag3', 'Tag4'],
      usedLanguages: ['Python'],
      customLink: '/custom/link2',
      gitLink: '/git/link2',
      members: ['Bruce Willis', 'Arnold Schwarzenegger', 'Jean-Claude Van Damme'],
    },
    {
      title: 'Проект 3',
      description: 'Описание 3',
      avatar: 'tuiIconUserLarge',
      projectTags: ['Tag5', 'Tag6'],
      usedLanguages: ['Java'],
      customLink: '/custom/link3',
      gitLink: '/git/link3',
      members: ['Leonardo DiCaprio', 'Brad Pitt', 'Tom Hanks'],
    },
    {
      title: 'Проект 4',
      description: 'Описание 4',
      avatar: 'tuiIconUserLarge',
      projectTags: ['Tag7', 'Tag8'],
      usedLanguages: ['C#'],
      customLink: '/custom/link4',
      gitLink: '/git/link4',
      members: ['Robert De Niro', 'Morgan Freeman', 'Al Pacino'],
    },
    {
      title: 'Проект ZOV',
      description: 'За Россию и дедов',
      avatar: 'tuiIconUserLarge',
      projectTags: ['Наш', 'Слоняра'],
      usedLanguages: ['PHP'],
      customLink: '/custom/link5',
      gitLink: '/git/link5',
      members: ['Евгений Пригожин', 'Владимир Путин', 'Дмитрий Медведев'],
    },
    {
      title: 'Проект Разгром',
      description: 'Его имя Робер Полсон',
      avatar: 'tuiIconUserLarge',
      projectTags: ['Порох', 'Мыло'],
      usedLanguages: ['Python'],
      customLink: '/custom/link6',
      gitLink: '/git/link6',
      members: ['Роберт Полсон', 'Тайлер Дерден', 'Jamie Foxx'],
    }
  ];

  constructor() {
    this.originalProjects = this.projects;
  }

  applyFilters() {
    this.projects = [...this.originalProjects]; // сброс к исходным проектам перед фильтрацией
  
    if(this.filters.title) {
      this.projects = this.projects.filter(p => p.title.includes(this.filters.title));
    }
  
    if(this.filters.language) {
      this.projects = this.projects.filter(p => p.usedLanguages.includes(this.filters.language));
    }
  }

  clearFilters() {
    this.filters = {
      title: '',
      language: ''
    };
    this.isFilterVisible = false; // скрыть фильтры после очистки
    this.projects = [...this.originalProjects]; 
  }
  
  hideFilters() {
    this.isFilterVisible = false;
  }

  isFilterVisible = false;

toggleFilter() {
  this.isFilterVisible = !this.isFilterVisible;
}

}