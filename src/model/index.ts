export interface Payload<T> {
  payload: T;
  type: string;
}
export interface Paging {
  page: number;
  size: number;
  totalElement: number;
  totalPages: number;
}
export interface DataList<T> extends Paging {
  data: T;
}

export interface FileUpload {
  uri: string;
  type: string;
  name: string;
}

export type Contact = {
  email: string;
  fullName: string;
  company: string;
  jobTitle: string;
  eventId: string;
  phaseIds?: string[];
  knowEventBy: string;
  linkedInUrl: string;
  companyUrl: string;
  telegramId: string;
};
