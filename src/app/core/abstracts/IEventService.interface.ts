import { Observable } from 'rxjs';
import { IEventSummary, IEvent } from '../interfaces/IEvent.interface';

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
   * @returns {Observable<IEventSummary>} - Observable containing the event
   */
  getEventById(id: string): Observable<IEventSummary>;
}
