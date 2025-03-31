import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventsDetailsPageComponent } from './events-details-page.component';
import { IEventService } from 'src/app/core/abstracts/IEventService.interface';
import { of, throwError } from 'rxjs';
import { IEventSummary } from 'src/app/core/interfaces/IEvent.interface';
import { DebugElement } from '@angular/core';
import { EVENTS_SERVICE_TOKEN } from 'src/app/core/tokens/event-api.token';
import { Routes, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { NotFoundError } from 'src/app/core/errors/not-found-error';
import { MockComponent } from 'ng-mocks';
import { SessionListComponent } from '../../components/session-list/session-list.component';
import { IEventDetail } from 'src/app/core/interfaces/IEventDetail.interface';

describe('EventsDetailsPageComponent', () => {
  let component: EventsDetailsPageComponent;
  let fixture: ComponentFixture<EventsDetailsPageComponent>;
  let mockService: jasmine.SpyObj<IEventService>;
  let el: DebugElement;
  const mockEvent: IEventDetail = {
    event: {
      id: '1',
      title: 'test title',
      subtitle: 'test subtitle',
      image: 'img test path',
    },
    sessions: [],
  };
  const routes: Routes = [
    {
      path: 'events/:id',
      component: EventsDetailsPageComponent,
    },
  ];
  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj<IEventService>('IEventService', [
      'getEventById',
    ]);
    spy.getEventById.and.returnValue(of(mockEvent));

    const mockedComponents = [MockComponent(SessionListComponent)];

    TestBed.configureTestingModule({
      declarations: [EventsDetailsPageComponent, ...mockedComponents],
      providers: [
        provideRouter(routes),
        {
          provide: EVENTS_SERVICE_TOKEN,
          useValue: spy,
        },
      ],
    });
    fixture = TestBed.createComponent(EventsDetailsPageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    mockService = TestBed.inject(
      EVENTS_SERVICE_TOKEN,
    ) as jasmine.SpyObj<IEventService>;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the event by its id', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      `events/${mockEvent.event.id}`,
      EventsDetailsPageComponent,
    );
    expect(component.event).toEqual(mockEvent);
    expect(mockService.getEventById).toHaveBeenCalledTimes(1);
    expect(mockService.getEventById).toHaveBeenCalledWith(mockEvent.event.id);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should handle errors when requesting an event by its id', async () => {
    const errorMessage = 'error test';
    mockService.getEventById.and.returnValue(
      throwError(() => new NotFoundError(errorMessage)),
    );

    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      `events/${mockEvent.event.id}`,
      EventsDetailsPageComponent,
    );
    expect(component.error).toBe(errorMessage);
    expect(component.loading).toBeFalse();
    expect(component.event).toBeNull();
  });
});
