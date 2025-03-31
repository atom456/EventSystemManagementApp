import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartState } from '../interfaces/cart/ICartState.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly _cartState$: BehaviorSubject<ICartState> =
    new BehaviorSubject({});
  public readonly cartState$: Observable<ICartState>;
  constructor() {
    this.cartState$ = this._cartState$.asObservable();
  }

  getCartSnapshot(): ICartState {
    return this._cartState$.getValue();
  }

  addItem(eventId: string, title: string, sessionsDate: string): void {
    const currentCart = this.getCartSnapshot();

    const event = currentCart[eventId] ?? {
      title,
      sessions: {},
    };

    const session = event.sessions[sessionsDate] ?? {
      date: sessionsDate,
      quantity: 0,
    };

    session.quantity += 1;
    event.sessions[sessionsDate] = session;
    currentCart[eventId] = event;

    this._cartState$.next({ ...currentCart });
  }

  removeItem(eventId: string, sessionDate: string): void {
    const currentCart = this.getCartSnapshot();
    const event = currentCart[eventId];
    if (!event || !event.sessions[sessionDate]) return;
    const session = event.sessions[sessionDate];
    session.quantity -= 1;
    if (session.quantity <= 0) {
      delete event.sessions[sessionDate];
    }

    if (Object.keys(event.sessions).length === 0) {
      delete currentCart[eventId];
    } else {
      currentCart[eventId] = event;
    }

    this._cartState$.next({ ...currentCart });
  }
}
