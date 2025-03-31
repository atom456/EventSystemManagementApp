import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListComponent } from './session-list.component';
import { MockPipe } from 'ng-mocks';
import { OrderByDateAscPipe } from 'src/app/shared/pipes/order-by-date-asc.pipe';

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let fixture: ComponentFixture<SessionListComponent>;

  beforeEach(() => {
    const mockedPipes = [MockPipe(OrderByDateAscPipe, (value) => value)];

    TestBed.configureTestingModule({
      declarations: [SessionListComponent, ...mockedPipes],
    });
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
