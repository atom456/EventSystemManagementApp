import { Observable } from 'rxjs';
import { EventSummary, IEvent } from '../interfaces/IEvent.interface';

export interface IEventService {
  /**
   * Retrieves the list of events from the mock JSON file.
   *
   * @returns {Observable<Array<IEvent>>} - Observable containing an array of events
   */
  getEvents(): Observable<Array<IEvent>>;

  /**
   * Retrieves the detail of a specific event.
   *
   * @param {string} id - The ID of the event to retrieve
   * @returns {Observable<EventSummary>} - Observable containing the full event detail
   */
  getEventInfo(id: string): Observable<EventSummary>;
}
