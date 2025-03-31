import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListItemComponent } from './session-list-item.component';

describe('SessionListItemComponent', () => {
  let component: SessionListItemComponent;
  let fixture: ComponentFixture<SessionListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionListItemComponent]
    });
    fixture = TestBed.createComponent(SessionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
