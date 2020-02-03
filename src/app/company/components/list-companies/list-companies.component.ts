import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.sass']
})
export class ListCompaniesComponent implements OnInit {

  public loading = true;
  public companies: any;
  public isEdit: boolean;
  public isStatusChange: boolean;
  public selectedCompany: Company;
  public placeholderMessage: string;
  public isAddSuccess: boolean;

  constructor(private http: HttpClient,
              private router: Router,
              private companyService: CompanyService) { }

  ngOnInit() {
  this.companyService.getCompanies()
    .subscribe( data => {
      this.loading = false;
      this.companies = data;
      console.log(data);
    },
    err => {
      this.loading = false;
      this.placeholderMessage = err.error.message
        ? err.error.message
        : 'An error occurred whilst fetching users ';
    }
  );

  }

  public promptEdit(content) {
    this.isEdit = true;
    this.selectedCompany = content;
  }

  public promptChangeActivationStatus(content) {
    this.isStatusChange = true;
    this.selectedCompany = content;
  }

  public updateCompany(event) {
    this.companies.splice(this.companies.indexOf(this.selectedCompany), 1, event);
    this.isEdit = false;
  }

  public addSuccess(event){
      this.isAddSuccess =event;
      this.placeholderMessage ='New Company successfully added';
  }

  public formatDate(date){
      return date;
  }

  public viewCompany(id){
    console.log(id)
    this.router.navigate(['companies/' + id]);
  }

}
