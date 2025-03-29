import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { IEvent } from 'src/app/core/interfaces/IEvent.interface';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { EventCardComponent } from '../event-card/event-card.component';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
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
    const mockedComponents = [MockComponent(EventCardComponent)];

    TestBed.configureTestingModule({
      declarations: [EventListComponent, ...mockedComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render any items if no events are provided', () => {
    component.events = [];
    fixture.detectChanges();

    const events = el.queryAll(By.css('[data-testid="event"]'));
    expect(events.length).toBe(0);
  });

  it('should render list items for each event', () => {
    component.events = mockEvents;
    fixture.detectChanges();
    const events = el.queryAll(By.css('[data-testid="event"]'));
    expect(events.length).toBe(mockEvents.length);
  });
});
