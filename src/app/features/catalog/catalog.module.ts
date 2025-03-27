import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CatalogRoutingModule } from './catalog-routing.module';

@NgModule({
  declarations: [CatalogPageComponent],
  imports: [CommonModule, CatalogRoutingModule],
})
export class CatalogModule {}
