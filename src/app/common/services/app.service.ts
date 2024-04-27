import { Injectable } from "@angular/core";
import { environment } from 'src/enviroments/enviroments';

@Injectable({ providedIn: 'root' })
export class AppService {
  readonly apiRatingUrl: string;
  readonly apiCabinetUrl: string;
  readonly apiUserUrl: string;

  constructor() {
    this.apiRatingUrl = environment.apiRatingUrl;
    this.apiCabinetUrl = environment.apiCabinetUrl;
    this.apiUserUrl = environment.apiUserUrl;
  }
}
