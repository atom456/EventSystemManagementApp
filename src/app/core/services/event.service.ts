import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IEvent } from '../interfaces/IEvent.interface';
import { IEventService } from '../abstract/IEventService.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotFoundError } from '../errors/not-found-error';
import { CONSTANTS } from '../constants/constants';
import { UnexpectedError } from '../errors/unexpected-error';
import { environment } from 'src/environments/environment';

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

  private handleHttpError(
    error: HttpErrorResponse,
    uiErrorMessage: string,
  ): Observable<never> {
    if (error.status === 404) {
      return throwError(() => new NotFoundError(uiErrorMessage));
    }
    return throwError(
      () => new UnexpectedError(CONSTANTS.ERROR_MESSAGES.UNEXPECTED),
    );
  }
}
