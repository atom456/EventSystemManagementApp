import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDetailsPageComponent } from './events-details-page.component';

describe('EventsDetailsPageComponent', () => {
  let component: EventsDetailsPageComponent;
  let fixture: ComponentFixture<EventsDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsDetailsPageComponent]
    });
    fixture = TestBed.createComponent(EventsDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
