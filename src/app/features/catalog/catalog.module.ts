import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
  CatalogPageComponent,
  EventCardComponent,
  EventListComponent,
];
@NgModule({
  declarations: [...components],
  imports: [CommonModule, CatalogRoutingModule, SharedModule],
})
export class CatalogModule {}
