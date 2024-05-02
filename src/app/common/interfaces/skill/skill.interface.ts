export interface ISkillTypesWithSkills {
    id : number,
    name : string,
    skills? : ISkillUser[]
}
export interface ISkillUser {
    id : number,
    name : string
}