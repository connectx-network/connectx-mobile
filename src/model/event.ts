export interface GetEventParams {
  page: number;
  size: number;
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
}

export interface EventHost {
  id: string;
  url: string;
  title: string;
  eventId: string;
}

export interface IDetailEvent extends Event {
  eventCategory: EventCategory;
}
