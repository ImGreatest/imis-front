import { EStatusEvent } from "@enums";

export interface IResEvent {
  id: number;
  name: string;
  dateStart: Date,
  dateEnd: Date,
  status: EStatusEvent,
  createrId: number;
  confidentPersonId: number;
}
