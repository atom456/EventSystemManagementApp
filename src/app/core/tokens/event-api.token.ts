import { InjectionToken } from '@angular/core';
import { IEventService } from '../abstract/IEventService.interface';

export const EVENTS_SERVICE_TOKEN = new InjectionToken<IEventService>(
  'EVENT_SERVICE_TOKEN',
);
