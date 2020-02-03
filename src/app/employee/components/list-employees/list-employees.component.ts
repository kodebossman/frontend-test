import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../model/employee';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.sass']
})
export class ListEmployeesComponent implements OnInit {

  @Input() companyId;
  public loading = true;
  public employees: any;
  public isEdit: boolean;
  public isStatusChange: boolean;
  public selectedEmployee: Employee;
  public placeholderMessage: string;
  public isAddSuccess: boolean;

  constructor(private http: HttpClient,
              private router: Router,
              private employeeService: EmployeeService) { }

  ngOnInit() {
  this.employeeService.getEmployeesByCompany(this.companyId)
    .subscribe( data => {
      this.loading = false;
      this.employees = data;
      console.log(data);
    },
    err => {
      this.loading = false;
      this.placeholderMessage = err.error.messageCompany
        ? err.error.message
        : 'An error occurred whilst fetching users ';
    }
  );

  }

  public promptEdit(content) {
    console.log(content);
    this.isEdit = true;
    this.selectedEmployee = content;
  }


  public updateEmployee(event) {
    this.employees.splice(this.employees.indexOf(this.selectedEmployee), 1, event);
    this.isEdit = false;
  }

  public addSuccess(event){
      this.isAddSuccess =event;
      this.placeholderMessage ='New Employee successfully added';
  }

  public formatDate(date){
      return date;
  }

  public viewEmployee(id){
    console.log(id)
    this.router.navigate(['employees/' + id]);
  }
}
