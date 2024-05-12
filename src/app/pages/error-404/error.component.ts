import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.less'
})
export class ErrorComponent {}
