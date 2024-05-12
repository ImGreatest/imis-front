import { ENotificationStatus } from "@enums";

export interface IReqCreateNoticeDto {
  senderId: number;
  recipientId: number;
  status: ENotificationStatus;
  visible: boolean;
}
