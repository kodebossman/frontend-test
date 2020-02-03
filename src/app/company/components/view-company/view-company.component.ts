import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../../model/company';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.sass']
})
export class ViewCompanyComponent implements OnInit {

  sub: Subscription;
  company: Company;
  companyId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.companyId = id;
      console.log(id);
      if (id) {
        this.companyService.getCompany(id).subscribe((company: any) => {
          if (company) {
            this.company = company;
          } else {
            console.log(`Company with id '${id}' not found, returning to list`);
          }
        });
      }
    });
  }


}
