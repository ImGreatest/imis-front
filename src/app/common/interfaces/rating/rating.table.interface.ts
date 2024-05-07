export interface IRatingTableElement{
    id: number
    name: string
    minuteUpdate: number
    default: boolean
    createrId: number
    creater:{
        name: string,
        surname: string
    }
}