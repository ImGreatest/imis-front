export interface ISuccessReq {
    id : number
    name : string
    description : string
    tags : ISuccessTagTag[]
    user:{
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