export interface ItemNotification {
  body: string;
  createdAt: string;
  id: string;
  isRead: boolean;
  notificationType: string;
  objectId: string;
  receiverId: string;
  sender: {
    avatarUrl: string;
    fullName: string;
    id: string;
    nickname: string;
  };
  senderId: string;
  status: string;
  title: string;
}
