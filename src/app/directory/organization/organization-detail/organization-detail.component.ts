import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationsService } from '../organization.service';
import { organization_list, organization_detail } from '../interfaces';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudjetSelectComponent } from '../../income/budjet/budjet-select/budjet-select.component';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Budjet_detail } from '../../income/budjet/interfaces';
@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  constructor(
    private orgService: OrganizationsService,
    private org_massage: MessageService,
    private org_dialog_ref: DynamicDialogRef,
    private budjet_ref: DynamicDialogRef,
    public org_dialog_config: DynamicDialogConfig,
    private org_dialog_servis: DialogService) { }

  form: FormGroup
  org_id = 0
  saved = false
  budj_det: Budjet_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: '',
    adress: ''
  }
  org_detail: organization_detail = {
    id: 0,
    bin: '',
    name_kaz: '',
    name_rus: '',
    adress: '',
    deleted: false,
    _budjet_reg: 0,
    budjet_name: '',
    _regiondar: 0,
    region_name: ''
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      bin: new FormControl(null, [Validators.required]),
      budjet_name: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required]),
      adress: new FormControl(null, [Validators.required])
    })

    this.org_id = this.org_dialog_config.data.org_id

    if (this.org_id !== 0) {
      this.orgService.fetchOrg(this.org_id)
        .subscribe(
          (data) => (
              this.org_detail = data
            )
        )
    }

  }


  saveOrg() {
    this.orgService.add(this.org_detail)
      .subscribe(
        (data) => (
          this.org_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Организация сохранена!' }),
          this.saved = true,
          this.closeOrg()
        ),
        (error) => (this.org_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
  }

  // addClassification() {
  //   this.budjet_ref = this.org_dialog_servis.open(BudjetSelectComponent,
  //     {
  //       header: 'Выбрать бюджет',
  //       width: '70%',
  //       height: '80%'
  //     })

  //   this.budjet_ref.onClose.subscribe((budjet: Budjet_detail) => {
  //     if (budjet) {
  //         this.org_detail._budjet_reg = budjet
  //     }
  //   })
  // }

  closeOrg() {
    this.org_dialog_ref.close(this.saved)
  }
}
