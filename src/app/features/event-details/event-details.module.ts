import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsRoutingModule } from './event-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventsDetailsPageComponent } from './pages/events-details-page/events-details-page.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { SessionListItemComponent } from './components/session-list-item/session-list-item.component';

@NgModule({
  declarations: [EventsDetailsPageComponent, SessionListComponent, SessionListItemComponent],
  imports: [CommonModule, EventDetailsRoutingModule, SharedModule],
})
export class EventDetailsModule {}
