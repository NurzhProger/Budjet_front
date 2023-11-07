import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationsService } from '../organization.service';
import { organization_list, organization_detail } from '../interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { OrganizationSelectComponent } from '../organization-select/organization-select.component';
import { log } from 'mathjs';
import { PeriodDetailComponent } from '../../period/period-detail/period-detail.component';
import { ABPSelectComponent } from '../../expenses/ABP/abp-select/abp-select.component';
import { abp_detail } from '../../expenses/ABP/interfaces';

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
    private regionDialogService: DialogService,
    private org_dialog_service: DialogService,
    private org_confirm: ConfirmationService,
    private period_dialog_ref: DynamicDialogRef
  ) { }

  form: FormGroup
  org_id = 0
  saved = false
  windowHeight: number
  _date = new Date


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
    _abp: {
      id: 0,
      code: '',
      name_kaz: '',
      name_rus: ''
    },
    parent_organizations: [{
      id: 0,
      _date: '',
      _organization: 0,
      _parent: {
        id: 0,
        name_rus: ''
      }
    }]
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      bin: new FormControl(null, [Validators.required]),
      budjet_name: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required]),
      adress: new FormControl(null, [Validators.required]),
      region_name: new FormControl(null, [Validators.required]),
      abp_name: new FormControl(null, [Validators.required])
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

  addOrg() {
    this.org_dialog_ref = this.org_dialog_service.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.org_dialog_ref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.SelectPeriod(org)
      }
    })
  }
  SelectPeriod(org: organization_detail) {
    this.period_dialog_ref = this.org_dialog_service.open(PeriodDetailComponent,
      {
        header: 'Выбор периода',
        width: '25%',
        height: '50%'
      })
    this.period_dialog_ref.onClose.subscribe((date: any) => {
      if (date) {
        let new_date = this.toLocaleDate(date)
        date = new Date(date).toLocaleDateString()

        let params = {
          _organization_id: this.org_detail.id,
          _parent_id: org.id,
          _date: new_date
        }

        let resp: any
        this.orgService
          .parent_organization_add(params)
          .subscribe(
            (data) => (resp = data,
              this.PushtoTable(org, resp.id, date),
              this.org_massage.add({ severity: 'success', summary: 'Успешно', detail: resp.status })),
            (error) => (this.org_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
          )

      }
    }
    )
  }
  PushtoTable(org: organization_detail, id_str: number, date: string) {
    this.org_detail.parent_organizations.push({
      id: id_str,
      _date: date,
      _organization: this.org_detail.id,
      _parent: {
        id: org.id,
        name_rus: org.name_rus
      }
    })
  }
  delParent(ri: number, id: number, org_name: string) {

    this.org_confirm.confirm({
      message: 'Удалить с родителя ' + org_name + '?',
      header: 'Удаление родителя',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let resp: any;
        this.orgService
          .parent_organization_del(id)
          .subscribe(
            (data) => (resp = data,
              this.org_detail.parent_organizations.splice(ri, 1),
              this.org_massage.add({ severity: 'success', summary: 'Успешно', detail: resp.status })),
            (error) => (this.org_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
          )
      },
      reject: () => {
        this.org_confirm.close();
      }
    })


  }
  toLocaleDate(dateForStr: string) {
    return new Date(dateForStr).toLocaleDateString() + ' ' + new Date(dateForStr).toLocaleTimeString();
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

  selectABP() {
    this.budjet_select_dialog_ref = this.budjetDialogService.open(ABPSelectComponent,
      {
        header: 'Выбор АБП',
        width: 'calc(60%)',
        height: 'calc(80%)',
        data: { apb_id: this.org_detail._abp.id }
      })
    this.budjet_select_dialog_ref.onClose.subscribe((abp: abp_detail) => {
      if (abp) {
        this.org_detail._abp = abp;
      }
    })
  }

  clearABP() {
    this.org_detail._abp = {
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
