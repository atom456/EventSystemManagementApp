import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ICartState } from 'src/app/core/interfaces/cart/ICartState.interface';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cartState: ICartState = {};
  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this._cartService.cartState$
      .pipe(takeUntil(this._destroy$))
      .subscribe((cart) => {
        this.cartState = cart;
      });
  }

  get isCartEmpty(): boolean {
    return Object.keys(this.cartState).length === 0;
  }

  remove(eventId: string, sessionDate: string): void {
    this._cartService.removeItem(eventId, sessionDate);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
