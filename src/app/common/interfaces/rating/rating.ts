export interface IRating{
    id: number,
    name: string,
    minuteUpdate: number,
    createrId: number
}

export interface ICreateRating{
    minuteUpdate: number
    name: string
    scope: IScope[]
}

interface IScope{
    tagId: number,
    ratingScore: number
}

export interface IUpdateRating{
    minuteUpdate?: number
    name?: string
    scope?: IScope[]
}