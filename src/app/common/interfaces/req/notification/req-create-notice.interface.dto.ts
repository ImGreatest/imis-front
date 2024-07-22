import { ENotificationStatus } from "@enums";

export interface IReqCreateNoticeDto {
  id: number;
  senderId: number;
  recipientId: number;
  status: ENotificationStatus;
  visible: boolean;
}
