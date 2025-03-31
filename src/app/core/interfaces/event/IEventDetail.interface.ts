import { ISession } from '../sessions/ISession.interface';
import { IEventSummary } from './IEvent.interface';

export interface IEventDetail {
  event: IEventSummary;
  sessions: Array<ISession>;
}
