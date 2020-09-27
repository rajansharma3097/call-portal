import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { JwtHelperService } from '../../core/auth/jwt-helper.service';
import { Page } from '../../shared/page';
import { PagedData } from '../../shared/paged-data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl;
  private tinyApiKey = environment.tinyApiKey;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  uploadAudio(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/upload-audio`, formData);
  }

  /**
   * A method that fetch audios from server
   * @param page The selected page
   * @returns {any} An observable containing the audio data
   */
  getAudioListing(page: Page): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/audio-list?page=${page.pageNumber}`)
               .pipe(
                 map((data: any) => {
                   if(data.code == 1) {
                    return this.getPagedData(page, data)
                   } else {
                     return data;
                   }
                 })
               );
  }

  /**
   * A method to delete audio
   * @param audioId Audio that need to delete
   */
  deleteAudio(audioId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/delete-audio/${audioId}`);
  }

  /**
   * A method that fetch audios from server
   * @param page The selected page
   * @returns {any} An observable containing the audio data
   */
  getEmailListing(page: Page): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/email-template-list?page=${page.pageNumber}`)
               .pipe(
                 map((data: any) => {
                   if(data.code == 1) {
                    return this.getPagedData(page, data)
                   } else {
                     return data;
                   }
                 })
               );
  }

   /**
   * A method that fetch emaildata from server
   * @param page The selected page
   * @returns {any} An observable containing the emailtemplate data
   */
  getEmailtemplate(emailID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/edit-email-template/${emailID}`)
               .pipe(
                 map((data: any) => {
                   if(data.code == 1) {
                    return data;
                   } else {
                     return data;
                   }
                 })
               );
  }
  
   /**
   * A method that update email data to server
   * @param formData The form data
   * @returns {any} An observable containing the emailtemplate data
   */
  updateEmailTemplate(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/update-email-template`, formData);
  }

  /**
   * A method return tinyApiKey
   */
  getTinyApiKey(){
      return this.tinyApiKey;
  }

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
   */
  private getPagedData(page: Page, data: any ): PagedData<any> {
    const pagedData = new PagedData<any>();
    page.totalElements = data.data.total;
    page.totalPages = page.totalElements / data.data.per_page;
    pagedData.data = data.data.data;
    pagedData.page = page;
    pagedData.code = data.code;
    return pagedData;
  }

}
