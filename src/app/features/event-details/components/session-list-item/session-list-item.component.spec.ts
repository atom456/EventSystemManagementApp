import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionListItemComponent } from './session-list-item.component';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { of } from 'rxjs';
import { ISession } from 'src/app/core/interfaces/sessions/ISession.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SessionListItemComponent', () => {
  let component: SessionListItemComponent;
  let fixture: ComponentFixture<SessionListItemComponent>;
  let mockCartService: jasmine.SpyObj<ShoppingCartService>;

  beforeEach(() => {
    mockCartService = jasmine.createSpyObj(
      'ShoppingCartService',
      ['addItem', 'removeItem'],
      {
        cartState$: of({}),
      },
    );

    TestBed.configureTestingModule({
      declarations: [SessionListItemComponent],
      providers: [{ provide: ShoppingCartService, useValue: mockCartService }],
    });

    fixture = TestBed.createComponent(SessionListItemComponent);
    component = fixture.componentInstance;

    component.session = {
      date: '2025-04-01',
      availability: '5',
    } as ISession;
    component.eventId = 'event-123';
    component.eventTitle = 'Test Event';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
