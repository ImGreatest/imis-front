export interface IUpdateCreateRole {
    name : string;
}
export interface IRole {
    id : number;
    name : string;
    Permission : IPermission[]
}
export interface IPermission {
    action : string,
    subject : string,
    conditions : {
        [key : string]: string
    },
    inverted : boolean

}
export interface IUpdatePermission {
    action : string;
    subject : string;
    inverted?: boolean;
    conditions?: {
        [key : string]: string;
    };
    reason?: string;
}
export interface IRoleAsserts {
    subjects : {
        [key : string]: string
    },

    actions : {
        [key : string]: string
    },
    posibleConditions : IPosibleConditions[]
}

interface IPosibleConditions {
    row : string
    entitys : string[]
}