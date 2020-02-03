import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCompaniesComponent } from './components/list-companies/list-companies.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCompanyComponent } from './components/view-company/view-company.component';
import { EmployeeModule } from '../employee/employee.module';



@NgModule({
  declarations: [ListCompaniesComponent, AddCompanyComponent, EditCompanyComponent, ViewCompanyComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeModule
  ]
})
export class CompanyModule { }
