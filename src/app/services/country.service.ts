import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private urlCountryApi = `https://restcountries.eu/rest/v2/all`;

  constructor(private http: HttpClient) {}
  public getCountries() {
    return this.http
      .get(this.urlCountryApi)
      .pipe(
        mergeMap((countries: Country[]) =>
          from(countries).pipe(map((country) => country.name))
        )
      );
  }
}
