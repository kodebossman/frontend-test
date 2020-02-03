import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  public employees: Employee[];


  constructor(private http: HttpClient) { }
  employeeUrl: string = 'http://localhost:8080/api/v1/employees';

  createEmployee(employee: any) {
    return this.http.post<any>(this.employeeUrl, employee);
  }

  editEmployee(employee: any) {
    return this.http.put<any>(this.employeeUrl + '/' + employee.id, employee);
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.employeeUrl);
  }

  getEmployeesByCompany(companyId: number): Observable<any> {
    return this.http.get<any>(this.employeeUrl + '/company/' + companyId);
  }
  getEmployee(id: any): Observable<any> {
    return this.http.get<any>(this.employeeUrl + '/' + id);
  }
}
