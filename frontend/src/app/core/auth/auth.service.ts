import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  authUrl = "http://localhost:8000/api/login";
  apiUrl = "http://localhost:8000/api";
  options: any;

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
  }

  signup(payLoad) {
    return this.http.post(`${this.baseUrl}/signup`, payLoad);
  }

  /**
   * Get an Access Token
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    // return this.http.post(`${this.baseUrl}/login`, payLoad);
    return this.http.post(
      this.authUrl,
      {
        grant_type: "password",
        client_id: "2",
        client_secret: "H8p1Y6fMmYZyaOX7V5VE8B78GVQ8Q2uvHl0bqrGB",
        email: email,
        password: password,
        // scope: ''
      },
      this.options
    );
  }

  /**
   * Revoke the authenticated user token
   */
  logout() {
    
    return this.http.get(this.apiUrl + "/token/revoke", this.options);
  }
}
