import { EStatusEvent } from "@enums";

export interface IReqCreateEventDto {
  name: string;
  dateStart: string;
  dateEnd: string;
  status: EStatusEvent;
  createdId: number;
  confidentPersonId: number;
}
