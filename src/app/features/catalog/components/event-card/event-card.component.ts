import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEvent } from 'src/app/core/interfaces/event/IEvent.interface';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
  @Input() event!: IEvent;
}
