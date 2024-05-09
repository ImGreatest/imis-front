import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-favorite-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-projects.component.html',
  styleUrl: './favorite-projects.component.less'
})
export class FavoriteProjectsComponent {}
