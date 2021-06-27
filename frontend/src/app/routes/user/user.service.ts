import { JwtHelperService } from './../../core/auth/jwt-helper.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  /**
   * Save Twilio Settings
   * @param postData
   */

  addTwilioCredentials(postData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/save-twilio-settings`, postData);
  }
   
  /**
   * The function remove twilio credentials
   * @param meta_key
   */
  removeOptionCredentials(meta_key:string): Observable<any> {

    return this.http.delete(`${this.baseUrl}/user/remove-credentials/${meta_key}`);
  }
  
    /**
   * The function remove twilio credentials
   * @param formData
   */
  changePassword(postData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/change-password`, postData);
  }
   
   /**
   * The function update Account Details
   * @param formData 
   */
  updateAccount(postData:any): Observable<any> {

    return this.http.post(`${this.baseUrl}/user/update-account`, postData);
  }
}
