export interface ISuccessRes {
    id : number
    name : string
    description : string
    tags : ISuccessTagTag[]
    user:{
        id: number
        name: string
        surname: string
        direction: {
          name: string
        },
        group: {
          name: string
        }
    }
}

export interface ISuccessTagTag {
    tag : {
        id: number,
        name: string
    }
}
export interface ISuccessReq{
    tags: number[]
    name: string
    description: string
    userId: number
}
export interface ISuccess {
    id : number,
    name : string
    description : string
    tags : ISuccessTag[]
    studentName:string
    studentSurname:string
    studentDirection:string
    studentGroup:string
}


export interface ISuccessTag {
        id: number,
        name: string
}

export interface ISuccessModalData{
    successId: number
}

export interface ISuccessStudent{
    id: number;
    name: string;
    surname: string;
    direction: { name: string };
    group: { name: string };
}