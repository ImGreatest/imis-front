import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "src/enviroments/enviroments";
import {IGetPage, PageRes, ISuccessReq} from '@interfaces';

@Injectable({providedIn: 'root'})
export class SuccessService {
    constructor(public http : HttpClient) {}

    getSuccessPage(data : IGetPage) : Observable < PageRes < ISuccessReq >> {
        return this.http.put < PageRes < ISuccessReq >> (`${environment.apiRatingUrl}/success/page`, data);
    }
}