import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEvent } from 'src/app/core/interfaces/event/IEvent.interface';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {
  @Input() events!: Array<IEvent>;
}
