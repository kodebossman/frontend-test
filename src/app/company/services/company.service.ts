import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../model/company';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public companies: Company[];


  constructor(private http: HttpClient) { }
  companyUrl: string = 'http://localhost:8080/api/v1/companies';

  createCompany(company: any) {
    return this.http.post<any>(this.companyUrl, company);
  }

  editCompany(company: any) {
    return this.http.put<any>(this.companyUrl + '/' + company.id, company);
  }

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.companyUrl);
  }

  getCompany(id: any): Observable<any> {
    return this.http.get<any>(this.companyUrl + '/' + id);
  }

}
