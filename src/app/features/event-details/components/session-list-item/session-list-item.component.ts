import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISession } from 'src/app/core/interfaces/ISession.interface';

@Component({
  selector: 'app-session-list-item',
  templateUrl: './session-list-item.component.html',
  styleUrls: ['./session-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionListItemComponent {
  public counter: number = 0;
  @Input() session!: ISession;

  plus(): void {
    this.counter = Math.min(
      this.counter + 1,
      Number(this.session.availability),
    );
  }

  minus(): void {
    this.counter = Math.max(this.counter - 1, 0);
  }
}
