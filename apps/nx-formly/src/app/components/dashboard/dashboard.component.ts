/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
} from '@ngx-formly/core';

import { map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'nx-formly-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  form = new FormGroup({});
  model = {
    name: 'James Bond',
    email: 'jb@example.com',
    city: 'UK-1',
    country: 'UK',
  };
  fields: FormlyFieldConfig[];

  constructor(private ds: DataService) {
    this.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name',
          placeholder: 'Enter name',
        },
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email address',
          placeholder: 'Enter email',
          required: true,
        },
      },
      {
        key: 'city',
        type: 'select',
        templateOptions: {
          label: 'Available Missions',
          placeholder: 'Current mission in',
          options: this.ds.getCities(),
        },
      },
      {
        key: 'country',
        type: 'select',
        templateOptions: {
          label: 'Country of the selected city',
          options: this.ds.getCountries(),
        },
        hooks: {
          onInit: (field?: FormlyFieldConfig) => {
            if (field && field.templateOptions && field.form) {
              field.templateOptions.options = field.form
                .get('city')
                ?.valueChanges.pipe(
                  startWith(this.model.country),
                  switchMap((cityValue) =>
                    this.ds.getCountries(cityValue.slice(0, 2))
                  )
                );
            }
          },
        },
      },
    ];
  }

  /* eslint-disable @angular-eslint/no-empty-lifecycle-method */
  ngOnInit(): void {
    //
  }

  onSubmit(form: FormGroup) {
    console.log('Form: ', form);
  }
}
