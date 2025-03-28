export interface IEvent {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  place: string;
  startDate: string; // in miliseconds as string
  endDate: string; // in miliseconds as string
  description: string;
}

export type EventSummary = Pick<IEvent, 'id' | 'title' | 'subtitle' | 'image'>;
