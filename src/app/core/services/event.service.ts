import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IEvent, IEventSummary } from '../interfaces/event/IEvent.interface';
import { IEventService } from '../abstracts/IEventService.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotFoundError } from '../errors/not-found-error';
import { CONSTANTS } from '../constants/constants';
import { UnexpectedError } from '../errors/unexpected-error';
import { environment } from 'src/environments/environment';
import { IEventDetail } from '../interfaces/event/IEventDetail.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService implements IEventService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  public getEvents(): Observable<Array<IEvent>> {
    return this._httpClient
      .get<Array<IEvent>>(`${this.baseUrl}/events.json`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleHttpError(
            error,
            CONSTANTS.ERROR_MESSAGES.UI.FAILED_TO_LOAD_EVENTS,
          ),
        ),
      );
  }

  public getEventById(id: string): Observable<IEventDetail> {
    return this._httpClient
      .get<IEventDetail>(`${this.baseUrl}/event-info-${id}.json`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleHttpError(
            error,
            CONSTANTS.ERROR_MESSAGES.UI.EVENT_NOT_FOUND,
            CONSTANTS.ERROR_MESSAGES.UI.FAILED_TO_LOAD_EVENT,
          ),
        ),
      );
  }

  private handleHttpError(
    error: HttpErrorResponse,
    uiErrorMessage: string,
    uiUnexpected: string = CONSTANTS.ERROR_MESSAGES.UNEXPECTED,
  ): Observable<never> {
    if (error.status === 404) {
      return throwError(() => new NotFoundError(uiErrorMessage));
    }
    return throwError(
      () =>
        new UnexpectedError(
          uiUnexpected ?? CONSTANTS.ERROR_MESSAGES.UNEXPECTED,
        ),
    );
  }
}
