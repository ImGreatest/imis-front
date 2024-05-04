import { scoringType } from "@enums"

export interface IRating{
    id: number,
    name: string,
    minuteUpdate: number,
    createrId: number
    default?: boolean;
}

export interface ICreateRating{
    minuteUpdate: number
    name: string
    scope: IScopeElement[]
    scoringType: scoringType
    default?: boolean;
}

export interface IScopeElement{
    tagId: number,
    ratingScore: number
}

export interface IUpdateRating extends Partial<ICreateRating> {
  }

