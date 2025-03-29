import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
const components = [AppComponent];
@NgModule({
  declarations: [...components],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule],
  bootstrap: [...components],
})
export class AppModule {}
