import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEvent } from 'src/app/core/interfaces/IEvent.interface';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  @Input() event!: IEvent;
}
