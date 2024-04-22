export interface IRatingTableElement{
    id: number
    name: string
    minuteUpdate: number
    createrId: number
    creater:{
        name: string,
        surname: string
    }
}