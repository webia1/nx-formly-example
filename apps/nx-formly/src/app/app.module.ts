/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgSelectFormlyComponent } from './customizations/formly/ng-select.type';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgSelectModule } from '@ng-select/ng-select';
import { dataCyExtension } from './customizations/formly/data-cy.extension';

// Angular Material Module
import { MatTabsModule } from '@angular/material/tabs';

// Validation Message Functions

export function minValidationMessage(err: any) {
  return `Min value ${err.min}. Your value: ${err.actual}`;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NgSelectFormlyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required',
        },
        {
          name: 'min',
          message: minValidationMessage,
        },
      ],
      types: [
        {
          name: 'ebia-ng-select',
          component: NgSelectFormlyComponent,
        },
      ],
      extensions: [
        {
          name: 'data-cy-extension',
          extension: dataCyExtension,
        },
      ],
    }),
    FormlyMaterialModule,
    AppRoutingModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),

    MatTabsModule,

    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [DashboardComponent],
})
export class AppModule {}
