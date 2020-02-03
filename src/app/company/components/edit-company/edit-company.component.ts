import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.sass']
})
export class EditCompanyComponent implements OnInit {

  @Input() company;
  @Output() updatedCompany = new EventEmitter();
  public companyForm: FormGroup;
  public isAlert: boolean;
  public opened = true;
  public message: string;
  public editState = ClrLoadingState.DEFAULT;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.createCompanyForm();
    this.initializeForm();
  }

  private createCompanyForm() {
    this.companyForm = new FormGroup({
      id: new FormControl('' , Validators.required),
      name: new FormControl('', Validators.required),
      vatNumber: new FormControl('', Validators.required),
      addressPhysical: new FormControl('', Validators.required),
      addressPostal: new FormControl('' , Validators.required),
      telephoneNumber: new FormControl('', Validators.required)
    });
  }

  private initializeForm() {
    this.companyForm.setValue({
      id: this.company.id,
      name: this.company.name,
      vatNumber: this.company.vatNumber,
      addressPhysical: this.company.addressPhysical,
      addressPostal: this.company.addressPostal,
      telephoneNumber: this.company.telephoneNumber
    });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }


  public editCompany() {
    this.editState = ClrLoadingState.LOADING;
    this.companyService
      .editCompany(this.companyForm.value)
      .subscribe(res => {
        this.editState = ClrLoadingState.SUCCESS;
        this.onClose(res);
      }, (err) => {
        this.editState = ClrLoadingState.ERROR;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  public onClose(company) {
    this.updatedCompany.emit(company);
  }
}
