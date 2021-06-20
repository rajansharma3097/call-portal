import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Page } from '../../shared/page';
import { PagedData } from '../../shared/paged-data';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Add Company
   * @param postData
   */
  addCompany(postData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-company`, postData);
  }

  /**
   * Get Company By CompanyId
   * @param companyId
   */
  getCompanyById(companyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-company/${companyId}`);
  }

  /**
   * A method that fetch companies from server
   * @param page The selected page
   * @returns {any} An observable containing the audio data
   */
  getCompanyListing(page: Page): Observable<any> {
    return this.http.get(`${this.baseUrl}/company-list?page=${page.pageNumber}`)
      .pipe(
        map((data: any) => {
          if (data.code == 1) {
            return this.getPagedData(page, data)
          } else {
            return data;
          }
        })
      );
  }

  /**
   * A method to delete company
   * @param companyId Company that need to delete
   */
  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-company/${companyId}`);
  }

  /**
   * A method that fetch companies from server
   * @param page The selected page
   * @returns {any} An observable containing the audio data
   */
  getCampaignListing(page: Page): Observable<any> {
    return this.http.get(`${this.baseUrl}/campaign-list?page=${page.pageNumber}`)
      .pipe(
        map((data: any) => {
          if (data.code == 1) {
            return this.getPagedData(page, data)
          } else {
            return data;
          }
        })
      );
  }

  /**
   * Get Campaign By campaignId
   * @param campaignId
   */
  getCampaignById(campaignId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-campaign/${campaignId}`);
  }

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<any>} An array of the selected data and page
   */
  private getPagedData(page: Page, data: any): PagedData<any> {
    const pagedData = new PagedData<any>();
    page.totalElements = data.data.total;
    page.totalPages = page.totalElements / data.data.per_page;
    pagedData.data = data.data.data;
    pagedData.page = page;
    pagedData.code = data.code;
    return pagedData;
  }

}
