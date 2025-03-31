import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENTS_SERVICE_TOKEN } from './tokens/event-api.token';
import { EventService } from './services/event.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: EVENTS_SERVICE_TOKEN,
      useClass: EventService,
    },
  ],
})
export class CoreModule {}
