import { Observable } from 'rxjs';
import { IEvent } from '../interfaces/IEvent.interface';

export interface IEventService {
  /**
   * Retrieves the list of events from the mock JSON file.
   *
   * @returns {Observable<Array<IEvent>>} - Observable containing an array of events
   */
  getEvents(): Observable<Array<IEvent>>;
}
