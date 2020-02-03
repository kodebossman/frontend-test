import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { EmployeeService } from 'src/app/employee/services/employee.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.sass']
})
export class AddEmployeesComponent implements OnInit {

  @Output() isAddSuccess = new EventEmitter();
  @Input() companyId;
  public employeeForm: FormGroup;
  public isAlert: boolean;
  public isAdd: boolean;
  public message: string;
  public addState = ClrLoadingState.DEFAULT;


  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.createemployeeForm();
    this.initializeForm();
  }

  private createemployeeForm() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      companyId: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      identityNumber: new FormControl('', Validators.required),
      addressPhysical: new FormControl('', Validators.required),
      addressPostal: new FormControl('', Validators.required),
      telephoneNumber: new FormControl('', Validators.required)
    });
  }

  private initializeForm(){
    this.employeeForm.setValue({
      companyId: this.companyId,
    });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }

  public promptAdd() {
    this.employeeForm.reset();
    this.isAlert = false;
    this.isAdd = true;
  }

  public addemployee() {
    this.addState = ClrLoadingState.DEFAULT;
    this.employeeService
      .createEmployee(this.employeeForm.value)
      .subscribe(() => {
        this.addState = ClrLoadingState.SUCCESS;
        this.isAdd = false;
        this.onClose(true);
      }, (err) => {
        this.addState = ClrLoadingState.ERROR;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  private onClose(isAdd: boolean) {
    this.isAddSuccess.emit(isAdd);
  }

}
