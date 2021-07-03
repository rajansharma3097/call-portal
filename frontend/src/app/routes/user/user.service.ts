import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { JwtHelperService } from "../../core/auth/jwt-helper.service";


@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  /**
   * Save Twilio Settings
   * @param postData
   */

  addTwilioCredentials(postData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/user/save-twilio-settings`,
      postData
    );
  }

  /**
   * The function remove twilio credentials
   * @param meta_key
   */
  removeOptionCredentials(meta_key: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/user/remove-credentials/${meta_key}`
    );
  }

  /**
   * The function remove twilio credentials
   * @param formData
   */
  changePassword(postData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/change-password`, postData);
  }

  /**
   *Get Country List.
   */
  getCounty(): Observable<any> {
    return this.http.get(`${this.baseUrl}/country`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  /**
   *Get Timezone List
   */
  getTimezone(): Observable<any> {
    return this.http.get(`${this.baseUrl}/timezone`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  /**
   *Get User Details
   */
  getUser() {
    return this.http.get(`${this.baseUrl}/user/getuser`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateUser(postData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/update-account`, postData);
  }
}
