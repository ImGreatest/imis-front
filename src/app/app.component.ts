import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {TuiThemeNightService} from "@taiga-ui/addon-doc";
import {TuiBrightness} from "@taiga-ui/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(@Inject(TuiThemeNightService) readonly night: TuiThemeNightService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any): boolean => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd): void => {
      console.log(event.url);
    });
  }
}
