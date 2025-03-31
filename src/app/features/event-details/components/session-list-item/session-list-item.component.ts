import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ISession } from 'src/app/core/interfaces/sessions/ISession.interface';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-session-list-item',
  templateUrl: './session-list-item.component.html',
  styleUrls: ['./session-list-item.component.scss'],
})
export class SessionListItemComponent implements OnInit, OnDestroy {
  @Input() session!: ISession;
  @Input() eventId!: string;
  @Input() eventTitle!: string;

  public counter: number = 0;
  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this._cartService.cartState$
      .pipe(takeUntil(this._destroy$))
      .subscribe((cart) => {
        const sessionInfo = cart[this.eventId]?.sessions[this.session.date];
        this.counter = sessionInfo?.quantity ?? 0;
      });
  }

  plus(): void {
    if (this.counter < +this.session.availability) {
      this._cartService.addItem(
        this.eventId,
        this.eventTitle,
        this.session.date,
      );
    }
  }

  minus(): void {
    if (this.counter > 0) {
      this._cartService.removeItem(this.eventId, this.session.date);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
