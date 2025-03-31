import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EVENTS_SERVICE_TOKEN } from 'src/app/core/tokens/event-api.token';
import { IEventService } from 'src/app/core/abstracts/IEventService.interface';
import { catchError, filter, finalize, map, of, switchMap, tap } from 'rxjs';
import { IEventDetail } from 'src/app/core/interfaces/event/IEventDetail.interface';

@Component({
  selector: 'app-events-details-page',
  templateUrl: './events-details-page.component.html',
  styleUrls: ['./events-details-page.component.scss'],
})
export class EventsDetailsPageComponent implements OnInit {
  public event: IEventDetail | null = null;
  public loading: boolean = false;
  public error: string | null = null;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _destroyRef: DestroyRef,
    @Inject(EVENTS_SERVICE_TOKEN) private readonly _eventService: IEventService,
  ) {}

  ngOnInit(): void {
    this._getEventData();
  }

  private _getEventData(): void {
    this._activatedRoute.paramMap
      .pipe(
        map((params: ParamMap) => params.get('id')),
        filter((id): id is string => id !== null),
        switchMap((id) => {
          this.loading = true;
          this.error = null;
          return this._eventService.getEventById(id).pipe(
            tap((response) => {
              this.event = response;
            }),
            catchError((err) => {
              this.error = err.message;
              return of(null);
            }),
            finalize(() => {
              this.loading = false;
            }),
          );
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
