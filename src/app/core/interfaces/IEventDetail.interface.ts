import { EventSummary } from './IEvent.interface';
import { ISession } from './ISession.interface';

export interface IEventDetail {
  event: EventSummary;
  sessions: Array<ISession>;
}
