import { IEventSummary } from './IEvent.interface';
import { ISession } from './ISession.interface';

export interface IEventDetail {
  event: IEventSummary;
  sessions: Array<ISession>;
}
