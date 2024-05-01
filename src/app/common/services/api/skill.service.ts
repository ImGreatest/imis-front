import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/enviroments/enviroments';
import { ICreateSkill, ISkillTypesWithSkills } from "@interfaces";
@Injectable({providedIn: 'root'})
export class SkillService {
    constructor(public http : HttpClient) {}

    deleteSkill(id : number) {
        return this
            .http
            .delete(`${environment.apiRatingUrl}/skill/${id}`);
    }

    deleteSkillType(id : number) {
        return this
            .http
            .delete(`${environment.apiRatingUrl}/skill/skillType/${id}`);
    }
    createSkill(skill: ICreateSkill) {
        return this
            .http
            .post(`${environment.apiRatingUrl}/skill`,skill);
    }

    createSkillType(skillType : string) {
        return this
            .http
            .post(`${environment.apiRatingUrl}/skill/skillType/${skillType}`, {});
    }

    getSkills() {
        return this
            .http
            .get<ISkillTypesWithSkills[]>(`${environment.apiRatingUrl}/skill`);
    }

    getUserSkills(userId : number) {
        return this
            .http
            .get(`${environment.apiRatingUrl}/skill/user/${userId}`);
    }

    getProjectSkills(projectId : number) {
        return this
            .http
            .get(`${environment.apiRatingUrl}/skill/project/${projectId}`);
    }
}