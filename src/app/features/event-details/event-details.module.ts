import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsRoutingModule } from './event-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventsDetailsPageComponent } from './pages/events-details-page/events-details-page.component';

@NgModule({
  declarations: [EventsDetailsPageComponent],
  imports: [CommonModule, EventDetailsRoutingModule, SharedModule],
})
export class EventDetailsModule {}
