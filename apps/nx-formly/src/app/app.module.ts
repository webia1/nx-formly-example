import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxsModule } from '@ngxs/store';
import { RoutedModule } from './routed/routed.module';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    RoutedModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    DashboardComponent
  ],
})
export class AppModule {}
