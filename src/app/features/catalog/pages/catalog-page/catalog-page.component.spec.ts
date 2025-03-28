import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { CatalogPageComponent } from './catalog-page.component';
import { IEventService } from 'src/app/core/abstract/IEventService.interface';
import { EVENTS_SERVICE_TOKEN } from 'src/app/core/tokens/event-api.token';
import { delay, of, throwError } from 'rxjs';
import { IEvent } from 'src/app/core/interfaces/IEvent.interface';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NotFoundError } from 'src/app/core/errors/not-found-error';
import { MockComponent } from 'ng-mocks';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
describe('CatalogPageComponent', () => {
  let component: CatalogPageComponent;
  let fixture: ComponentFixture<CatalogPageComponent>;
  let eventsServiceMock: jasmine.SpyObj<IEventService>;
  let el: DebugElement;
  const mockEvents: Array<IEvent> = [
    {
      id: '1',
      title: 'Event 1',
      subtitle: 'Sub 1',
      image: 'img1.jpg',
      place: 'Place 1',
      startDate: 'date1',
      endDate: 'date2',
      description: 'Desc 1',
    },
    {
      id: '2',
      title: 'Event 2',
      subtitle: 'Sub 2',
      image: 'img2.jpg',
      place: 'Place 2',
      startDate: 'date3',
      endDate: 'date4',
      description: 'Desc 2',
    },
  ];
  beforeEach(waitForAsync(() => {
    const eventServiceSpy = jasmine.createSpyObj<IEventService>(
      'IEventService',
      ['getEvents'],
    );

    const mockedComponents = [
      MockComponent(EventListComponent),
      MockComponent(LoaderComponent),
    ];

    eventServiceSpy.getEvents.and.returnValue(of(mockEvents));
    TestBed.configureTestingModule({
      declarations: [CatalogPageComponent, ...mockedComponents],
      providers: [
        {
          provide: EVENTS_SERVICE_TOKEN,
          useValue: eventServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogPageComponent);
    component = fixture.componentInstance;
    eventsServiceMock = TestBed.inject(
      EVENTS_SERVICE_TOKEN,
    ) as jasmine.SpyObj<IEventService>;
    el = fixture.debugElement;
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init with correct data', () => {
    expect(component.events).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });
  it('should load the events on init', () => {
    fixture.detectChanges();
    expect(eventsServiceMock.getEvents).toHaveBeenCalledTimes(1);
    expect(component.events.length).toBe(mockEvents.length);
    expect(component.events).toEqual(mockEvents);
  });
  it('should show loading while fetching events', fakeAsync(() => {
    eventsServiceMock.getEvents.and.returnValue(
      of(mockEvents).pipe(delay(500)),
    );

    fixture.detectChanges();
    let loadingEl = el.query(By.css('[data-testid="loader"]'));
    expect(loadingEl).toBeTruthy();

    tick(500);
    fixture.detectChanges();

    loadingEl = el.query(By.css('[data-testid="loader"]'));
    expect(loadingEl).toBeFalsy();
  }));
  it('should hide the loading if we got data', () => {
    fixture.detectChanges();
    const loadingEl = el.query(By.css('[data-testid="loader"]'));
    expect(loadingEl).toBeFalsy();
  });
  it('should show an error message if the server responds with an error', () => {
    eventsServiceMock.getEvents.and.returnValue(
      throwError(() => new NotFoundError('error test')),
    );
    fixture.detectChanges();
    const error = el.query(By.css('[data-testid="error"]'));
    const loading = el.query(By.css('[data-testid="loader"]'));
    const events = el.queryAll(By.css('[data-testid=event'));
    expect(error).toBeTruthy();
    expect(loading).toBeFalsy();
    expect(events.length).toBe(0);
  });
});
