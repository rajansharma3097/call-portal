import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private baseUrl = environment.apiUrl;
  private countries$: Observable<Array<any>>;
  private companies$: Observable<Array<any>>;
  private timezones$: Observable<Array<any>>;

  constructor(private http: HttpClient) { }

  get countries() {
    if (!this.countries$) {
      this.countries$ = this.requestCountries().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.countries$;
  }

  get companies() {
    if (!this.companies$) {
      this.companies$ = this.requestCompanies().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.companies$;
  }

  get hours() {
    var hours, minutes, ampm;
    let timeArr = [];
    for(var i = 0; i <= 1410; i += 30 ){
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (minutes < 10){
            minutes = '0' + minutes; // adding leading zero
        }
        ampm = hours % 24 < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        if (hours === 0){
            hours = 12;
        }
        timeArr.push(hours + ':' + minutes + ' ' + ampm); 
    }
    return timeArr;
  }

  get timezones() {
    if (!this.timezones$) {
      this.timezones$ = this.requestTimezones().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.timezones$;
  }

  private requestCountries() {
    return this.http.get<any>(`${this.baseUrl}/get-countries`).pipe(
      map(response =>  { return response.data;})
    );
  }

  private requestCompanies() {
    return this.http.get<any>(`${this.baseUrl}/get-companies`).pipe(
      map(response =>  { return response.data;})
    );
  }

  private requestTimezones() {
    return this.http.get<any>(`${this.baseUrl}/get-timezones`).pipe(
      map(response =>  { return response.data;})
    );
  }

  public getmyData() {
    return [
        {
        'day': 'Mon',
        'openTime': '08:00 AM',
        'closeTime': '9:00 PM',
        'isClosed': 0
        },
        {
          'day': 'Tue',
          'openTime': '08:00 AM',
          'closeTime': '9:00 PM',
          'isClosed': 0
        }
      ];
  }

}
