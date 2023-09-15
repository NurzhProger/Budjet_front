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
import { budjet_reg__element } from '../../planirovanie/budjet-reg/budjet-reg-list/interfaces';
import { BudjetRegListComponent } from '../../planirovanie/budjet-reg/budjet-reg-list/budjet-reg-list.component';
import { RegionsListComponent } from '../../planirovanie/regions/regions-list/regions-list.component';
import { regions__element } from '../../planirovanie/regions/interfaces';
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
    private budjet_select_dialog_ref: DynamicDialogRef,
    public org_dialog_config: DynamicDialogConfig,
    private budjetDialogService: DialogService,
    private region_select_dialog_ref: DynamicDialogRef,
    private regionDialogService: DialogService
    ) { }

  form: FormGroup
  org_id = 0
  saved = false
 
  
  org_detail: organization_detail = {
    id: 0,
    bin: '',
    name_kaz: '',
    name_rus: '',
    adress: '',
    deleted: false,
    _budjet_reg: {
        id: 0,
        code: '',
        name_kaz: '',
        name_rus: ''
    },
    _regiondar: {
      id: 0,
      name: '',
      name_kaz: '',
      name_rus: ''
    },
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      bin: new FormControl(null, [Validators.required]),
      budjet_name: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required]),
      adress: new FormControl(null, [Validators.required]),
      region_name: new FormControl(null, [Validators.required]),
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


  selectBudjet() {
    this.budjet_select_dialog_ref = this.budjetDialogService.open(BudjetRegListComponent,
      {
          header: 'Выбор бюджета региона',
          width: 'calc(60%)',
          height: 'calc(80%)',
          data: { budjetreg_id: this.org_detail._budjet_reg.id }
      })
    this.budjet_select_dialog_ref.onClose.subscribe((budjet_reg: budjet_reg__element) => {
      if (budjet_reg) {
        this.org_detail._budjet_reg = budjet_reg;
      }
      })
  }

  clearBudjet() {
    this.org_detail._budjet_reg = {
      id: 0,
      code: '',
      name_kaz: '',
      name_rus: ''
  };
  }

  selectRegion() {
    this.region_select_dialog_ref = this.regionDialogService.open(RegionsListComponent,
      {
          header: 'Выбор региона',
          width: 'calc(60%)',
          height: 'calc(80%)',
          data: { regions_id: this.org_detail._regiondar.id }
      })
    this.region_select_dialog_ref.onClose.subscribe((regions: regions__element) => {
      if (regions) {
        this.org_detail._regiondar = regions;
      }
      })
  }

  clearRegion() {
    this.org_detail._regiondar = {
      id: 0,
      name: '',
      name_kaz: '',
      name_rus: ''
    };
  }

  closeOrg() {
    this.org_dialog_ref.close(this.saved)
  }
}
