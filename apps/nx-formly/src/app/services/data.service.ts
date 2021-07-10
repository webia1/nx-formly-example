import { Countries } from './mock-data/country';
import { Cities } from './mock-data/cities';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  cities = Cities;
  countries = Countries;

  getCities() {
    return of(this.cities);
  }

  getCountries(country?: string) {
    console.log('GetCountries: ', country);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry = this.countries.filter((entry: any) => {
      if (country) {
        return entry.value === country;
      } else {
        return true;
      }
    });

    console.log('GET COUNTRY ENTRY: ', entry);

    return of(entry);
  }
}
