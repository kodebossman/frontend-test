import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { AddEmployeesComponent } from './components/add-employees/add-employees.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListEmployeesComponent, AddEmployeesComponent, EditEmployeeComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListEmployeesComponent, AddEmployeesComponent, EditEmployeeComponent
  ]
})
export class EmployeeModule { }
