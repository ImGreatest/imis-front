import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "src/enviroments/enviroments";
import {IGetPage, PageRes, ISuccessRes, ISuccessReq} from '@interfaces';

@Injectable({providedIn: 'root'})
export class SuccessService {
    constructor(public http : HttpClient) {}

    getSuccessPage(data : IGetPage) : Observable < PageRes < ISuccessRes >> {
        return this.http.put < PageRes < ISuccessRes >> (`${environment.apiRatingUrl}/success/page`, data);
    }
    createSuccess(data : ISuccessReq){
        return this.http.post(`${environment.apiRatingUrl}/success`, data)
    }
    updateSuccess(id:number,data : ISuccessReq){
        return this.http.put(`${environment.apiRatingUrl}/success/${id}`, data)
    }

    getSuccessById(id : number) : Observable < ISuccessRes > {
        return this.http.get<ISuccessRes>(`${environment.apiRatingUrl}/success/${id}`)
    }
}