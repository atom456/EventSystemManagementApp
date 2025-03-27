import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventsDetailsPageComponent } from './pages/events-details-page/events-details-page.component';

const routes: Routes = [
  {
    path: '',
    component: EventsDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDetailsRoutingModule {}
