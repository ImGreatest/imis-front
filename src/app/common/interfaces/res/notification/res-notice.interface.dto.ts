import { ENotificationStatus } from "@enums";

export interface IResNoticeDto {
  id: number;
  senderId: number;
  recipientId: number;
  status: ENotificationStatus;
  dateTimeSent: Date;
  visible: boolean;
}
