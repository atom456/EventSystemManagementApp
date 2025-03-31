import { Observable } from 'rxjs';
import { IEvent } from '../interfaces/event/IEvent.interface';
import { IEventDetail } from '../interfaces/event/IEventDetail.interface';

export interface IEventService {
  /**
   * Retrieves the list of events from the mock JSON data.
   *
   * @returns {Observable<Array<IEvent>>} - Observable containing an array of events
   */
  getEvents(): Observable<Array<IEvent>>;

  /**
   * Retrieves a single event by its unique ID from the mock JSON data.
   *
   * @param {string} id - The ID of the event to retrieve
   * @returns {Observable<IEventDetail>} - Observable containing an object with the event and its sessions
   */
  getEventById(id: string): Observable<IEventDetail>;
}
