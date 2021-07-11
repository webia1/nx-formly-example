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
    id: 4711,
    name: 'James Bond',
    teamsize: 4,
    city: 'UK-1',
    country: 'UK',
  };
  fields: FormlyFieldConfig[];

  constructor(private ds: DataService) {
    this.fields = [
      {
        key: 'id',
      },
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Agent Name',
          placeholder: 'Enter name',
          required: true,
        },
      },
      {
        key: 'teamsize',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Desired team size',
          placeholder: 'Enter desired team size',
          required: true,
          min: 3,
          max: 70,
        },
        validation: {
          messages: {
            max: 'Max team size is 70!',
          },
        },
      },
      {
        key: 'city',
        type: 'nx-formly-ng-select',

        templateOptions: {
          label: 'Available Missions',
          placeholder: 'Current mission in',
          required: true,
          options: this.ds.getCities(),
        },
      },
      {
        key: 'country',
        type: 'select',
        templateOptions: {
          label: 'Country of the selected misson',
          options: this.ds.getCountries(),
          readonly: true,
        },
        expressionProperties: {
          'model.country': 'model.city.slice(0, 2)',
        },
        /*         hooks: {
          onInit: (field?: FormlyFieldConfig) => {
            if (field && field.templateOptions && field.form) {
              field.templateOptions.options = field.form
                .get('city')
                ?.valueChanges.pipe(
                  startWith(this.model.country),
                  switchMap((cityValue) =>
                    this.ds.getCountries(
                      cityValue ? cityValue.slice(0, 2) : ''
                    )
                  )
                );
            }
          },
        }, */
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
