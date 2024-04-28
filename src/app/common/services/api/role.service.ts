import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../enviroments/enviroments';
import {Observable} from 'rxjs';
import {IUpdateCreateRole, IRole, IUpdatePermission, IRoleAsserts} from '../../interfaces/role/role.interface';
import {PageRes} from '../../interfaces/page';

@Injectable({providedIn: 'root'})
export class RoleService {
    constructor(public http : HttpClient) {}

    create(role : IUpdateCreateRole) : Observable < IRole > {
        return this.http.post < IRole > (`${environment.apiRatingUrl}/role`, role);
    }
    getPage(limit : number, page : number, direction : -1 | 1, name : string) : Observable < PageRes < IRole >> {
        return this.http.get < PageRes < IRole >> (`${environment.apiRatingUrl}/role/page-${page}?limit=${limit}&direction=${direction}&name=${name}`)
    }
    getRoleAssert() {
        return this.http.get < IRoleAsserts > (`${environment.apiRatingUrl}/role/role-assert`)
    }

    delete(id : number) {
        return this
            .http
            .delete(`${environment.apiRatingUrl}/role/${id}`)
    }
    createDeletePermissions(roleId : number, newPermission : IUpdatePermission[],) {
        return this
            .http
            .put(`${environment.apiRatingUrl}/role/${roleId}`, newPermission)
    }

}
