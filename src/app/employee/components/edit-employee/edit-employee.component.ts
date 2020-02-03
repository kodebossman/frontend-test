import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.sass']
})
export class EditEmployeeComponent implements OnInit {

  @Input() employee;
  @Output() updatedEmployee = new EventEmitter();
  public employeeForm: FormGroup;
  public isAlert: boolean;
  public opened = true;
  public message: string;
  public editState = ClrLoadingState.DEFAULT;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.createEmployeeForm();
    this.initializeForm();
  }

  private createEmployeeForm() {
    this.employeeForm = new FormGroup({
      id: this.employee.id,
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      identityNumber: new FormControl('', Validators.required),
      addressPhysical: new FormControl('', Validators.required),
      addressPostal: new FormControl('', Validators.required),
      telephoneNumber: new FormControl('', Validators.required)
    });
  }

  private initializeForm() {
    this.employeeForm.setValue({
      id: this.employee.id,
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      identityNumber: new FormControl('', Validators.required),
      addressPhysical: new FormControl('', Validators.required),
      addressPostal: new FormControl('', Validators.required),
      telephoneNumber: new FormControl('', Validators.required)
    });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }


  public editEmployee() {
    this.editState = ClrLoadingState.LOADING;
    this.employeeService
      .editEmployee(this.employeeForm.value)
      .subscribe(res => {
        this.editState = ClrLoadingState.SUCCESS;
        this.onClose(res);
        this.isAlert = false;
      }, (err) => {
        this.editState = ClrLoadingState.ERROR;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  public onClose(employee) {
    this.updatedEmployee.emit(employee);
  }

}
