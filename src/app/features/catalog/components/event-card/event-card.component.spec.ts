import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventCardComponent } from './event-card.component';
import { IEvent } from 'src/app/core/interfaces/IEvent.interface';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;
  let el: DebugElement;
  const mockEvent: IEvent = {
    id: '1',
    title: 'Event 1',
    subtitle: 'Sub 1',
    image: 'img1.jpg',
    place: 'Place 1',
    startDate: '1444255200000',
    endDate: '1443650400000',
    description: 'Desc 1',
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EventCardComponent],
      imports: [CommonModule, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.event = mockEvent;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show event data', () => {
    fixture.detectChanges();

    const event_title = el.query(By.css('[data-testid="event-title"]'));
    const event_subtitle = el.query(By.css('[data-testid="event-subtitle"]'));
    const event_image = el.query(By.css('[data-testid="event-image"]'));
    const event_startDate = el.query(By.css('[data-testid="event-startDate"]'));
    const event_endDate = el.query(By.css('[data-testid="event-endDate"]'));

    const formattedStartDate = new DatePipe('en-US').transform(
      +mockEvent.startDate,
      'dd/MM/yyyy',
    );
    const formattedEndDate = new DatePipe('en-US').transform(
      +mockEvent.endDate,
      'dd/MM/yyyy',
    );

    expect(event_title.nativeElement.textContent).toBe(mockEvent.title);
    expect(event_subtitle.nativeElement.textContent).toBe(mockEvent.subtitle);
    expect(event_image.nativeElement.src).toContain(mockEvent.image);
    expect(event_startDate.nativeElement.textContent.trim()).toBe(
      formattedStartDate,
    );
    expect(event_endDate.nativeElement.textContent.trim()).toBe(
      formattedEndDate,
    );
  });
});
