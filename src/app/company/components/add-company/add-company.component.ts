import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.sass']
})
export class AddCompanyComponent implements OnInit {

  @Output() isAddSuccess = new EventEmitter();
  public companyForm: FormGroup;
  public isAlert: boolean;
  public isAdd: boolean;
  public message: string;
  public addState = ClrLoadingState.DEFAULT;


  constructor(private companysService: CompanyService) {

  }

  ngOnInit() {
    this.createCompanyForm();
  }

  private createCompanyForm() {
    this.companyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      vatNumber: new FormControl('', Validators.required),
      addressPhysical: new FormControl('', Validators.required),
      addressPostal: new FormControl('' , Validators.required),
      telephoneNumber: new FormControl('', Validators.required)
    });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }

  public promptAdd() {
    this.companyForm.reset();
    this.isAlert = false;
    this.isAdd = true;
  }

  public addCompany() {
    this.addState = ClrLoadingState.DEFAULT;
    this.companysService
      .createCompany(this.companyForm.value)
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
