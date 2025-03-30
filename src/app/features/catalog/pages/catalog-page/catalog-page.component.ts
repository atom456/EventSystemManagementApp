import { Component, Inject, OnInit } from '@angular/core';
import { catchError, finalize, of, take, tap } from 'rxjs';
import { IEventService } from 'src/app/core/abstracts/IEventService.interface';
import { IEvent } from 'src/app/core/interfaces/IEvent.interface';
import { EVENTS_SERVICE_TOKEN } from 'src/app/core/tokens/event-api.token';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit {
  events: Array<IEvent> = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    @Inject(EVENTS_SERVICE_TOKEN)
    private readonly _eventsService: IEventService,
  ) {}

  //#region Lifecycle Hook Methods
  ngOnInit(): void {
    this._loadEvents();
  }
  //#endregion

  /**
   * Load the events using the service
   *
   * @returns {void}
   */
  private _loadEvents(): void {
    this.loading = true;
    this.error = null;
    this._eventsService
      .getEvents()
      .pipe(
        tap((events) => {
          this.events = events;
        }),
        catchError((err) => {
          this.error = err.message;
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe();
  }
}
