import {UserInfo} from './user';

export interface GetEventParams {
  page: number;
  size: number;
  userId?: string;
}

export interface EventCategory {
  id: string;
  name: string;
}

export interface EventAsset {
  id: string;
  url: string;
  type: string;
  eventId: string;
}

export interface LocationDetail {
  id: string;
  latitude: string;
  longitude: string;
  eventId: string;
}

export interface Event {
  agenda: null | string;
  createdAt: string;
  eventCategoryId: string;
  eventDate: string;
  id: string;
  location: string;
  name: string;
  speakers: null | string;
  sponsors: null | string;
  tiketPrice: null | string;
  description: string;
  eventAssets: EventAsset[];
  eventHosts: EventHost[];
  eventLocationDetail: LocationDetail;
  eventEndDate: string;
  joinedEventUsers: Array<JoinEventUser>;
  _count: {
    eventAssets: number;
    eventHosts: number;
    joinedEventUsers: number;
  };
  shortId: string;
}

export interface EventHost {
  id: string;
  url: string;
  title: string;
  eventId: string;
}

export interface JoinEventUser {
  checkInDate: null | string;
  checkedIn: boolean;
  eventId: string;
  id: string;
  joinDate: string;
  userId: string;
  user: {avatarUrl: string};
}

export interface IDetailEvent extends Event {
  eventCategory: EventCategory;
}

export interface ParamsFetchJoinEvent {
  page: number;
  size: number;
  eventId: string;
  userId: string;
}

export interface GetQrCodeEventParams {
  eventId: string;
  userId: string;
}

export interface InfoQrEventResponse {
  user: UserInfo;
  joinDate: string;
  eventId: string;
  userId: string;
  checkInDate: string;
  checkedIn: boolean;
  event: Event;
}
