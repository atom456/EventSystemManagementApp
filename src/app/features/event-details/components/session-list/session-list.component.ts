import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISession } from 'src/app/core/interfaces/sessions/ISession.interface';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
})
export class SessionListComponent {
  @Input() eventSessions!: Array<ISession>;
  @Input() error!: string | null;
  @Input() eventId!: string;
  @Input() eventTitle!: string;
}
