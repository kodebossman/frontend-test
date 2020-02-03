import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCompaniesComponent } from './company/components/list-companies/list-companies.component';
import { ViewCompanyComponent } from './company/components/view-company/view-company.component';


const routes: Routes = [

  { path: '', redirectTo: '/companies', pathMatch: 'full' },
  { path: 'companies', component: ListCompaniesComponent , pathMatch: 'full'},
  { path: 'companies/:id', component: ViewCompanyComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
