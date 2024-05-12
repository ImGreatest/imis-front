import { Injectable } from "@angular/core";
import { environment } from 'src/enviroments/enviroments';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AppService {
  readonly apiRatingUrl: string;
  readonly apiUserUrl: string;


  constructor(private router: Router) {
    this.apiRatingUrl = environment.apiRatingUrl;
    this.apiUserUrl = environment.apiUserUrl;
  }
}
