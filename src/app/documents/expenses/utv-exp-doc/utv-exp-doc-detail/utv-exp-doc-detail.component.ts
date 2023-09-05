import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FkrSelectComponent } from 'src/app/directory/expenses/fkr/fkr-select/fkr-select.component';
import { fkr_detail } from 'src/app/directory/expenses/fkr/interfaces';
import { specification_income_detail } from 'src/app/directory/income/specification-income/interfaces';
import { utv_expenses_detail } from '../interfaces';
import { UtvExpensesService } from '../utv_expenses.service';
import { SHA256 } from 'crypto-js';
import { SpecificationExpSelectComponent } from 'src/app/directory/expenses/specification-exp/specification-exp-select/specification-exp-select.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { Budjet_detail } from 'src/app/directory/income/budjet/interfaces';

@Component({
  selector: 'app-utv-exp-doc-detail',
  templateUrl: './utv-exp-doc-detail.component.html',
  styleUrls: ['./utv-exp-doc-detail.component.css']
})
export class UtvExpDocDetailComponent implements OnInit, DoCheck {

  constructor(
    private utvDetailService: UtvExpensesService,
    private utvDetailmsg: MessageService,
    private utvDetailref: DynamicDialogRef,
    private utvDetaildialog: DialogService,
    private utvDetailconfirm: ConfirmationService
  ) {
    this.items = [
      {
        label: 'Записать',
        icon: 'pi pi-save',
        command: () => {

        }
      }
    ]
  }

  @Input() utv_exp_id = ''
  @Output() closeEvent = new EventEmitter<any>();

  items: MenuItem[]
  form: FormGroup
  obligats: any = []
  payments: any = []

  fkr_array: fkr_detail[] = []

  allrecord = true
  _lastfkr = 0
  firstclick = true
  hashBegin = ''
  hashEnd = ''
  nochanged = true
  selectedrow = false
  fkr: fkr_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: ''
  }

  budj_det: Budjet_detail = {
    adress: '',
    code: '',
    id: 0,
    name_kaz: '',
    name_rus: ''
  }

  utvDetail: utv_expenses_detail = {
    doc: {
      id: 0,
      nom: '',
      _date: '',
      deleted: false,
      _organization: {
        id: 0,
        bin: '',
        name_kaz: '',
        name_rus: '',
        adress: '',
        _budjet: this.budj_det
      }
    },
    payments: [{
      id: 0,
      god: 0,
      sm1: 0,
      sm2: 0,
      sm3: 0,
      sm4: 0,
      sm5: 0,
      sm6: 0,
      sm7: 0,
      sm8: 0,
      sm9: 0,
      sm10: 0,
      sm11: 0,
      sm12: 0,
      _date: '',
      _utv_exp: 0,
      _organization: 0,
      _fkr: {
        id: 0,
        code: '',
        name_kaz: '',
        name_rus: ''
      },
      _spec: {
        id: 0,
        code: '',
        name_kaz: '',
        name_rus: ''
      }
    }],
    obligats: [{
      id: 0,
      god: 0,
      sm1: 0,
      sm2: 0,
      sm3: 0,
      sm4: 0,
      sm5: 0,
      sm6: 0,
      sm7: 0,
      sm8: 0,
      sm9: 0,
      sm10: 0,
      sm11: 0,
      sm12: 0,
      _date: '',
      _utv_exp: 0,
      _organization: 0,
      _fkr: {
        id: 0,
        code: '',
        name_kaz: '',
        name_rus: ''
      },
      _spec: {
        id: 0,
        code: '',
        name_kaz: '',
        name_rus: ''
      }
    }]
  }

  viewOrg() {
    this.utvDetailref = this.utvDetaildialog.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this.utvDetail.doc._organization.id }
      })

    this.utvDetailref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.utvDetail.doc._organization.id = org.id,
          this.utvDetail.doc._organization.name_rus = org.name_rus
      }
    })
  }

  selectOrg() {
    this.utvDetailref = this.utvDetaildialog.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.utvDetailref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.utvDetail.doc._organization.id = org.id,
          this.utvDetail.doc._organization.name_rus = org.name_rus
      }
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null, [Validators.required]),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required])
    })
    if (this.utv_exp_id !== '') {
      this.utvDetailService.fetch_detail(parseInt(this.utv_exp_id))
        .subscribe(
          (detail) => {
            this.utvDetail = detail,
              this.obligats = this.utvDetail.obligats,
              this.payments = this.utvDetail.payments,
              this.addFKRtoArray()
          }
        )
    }

    let objString = JSON.stringify(this.utvDetail)
    this.hashBegin = SHA256(objString).toString()

  }

  addFKRtoArray() {
    this.fkr_array = []

    for (let i = 0; i < this.utvDetail.payments.length; i++) {

      let index = this.fkr_array.findIndex(item => this.utvDetail.payments[i]._fkr.id === item.id)

      if (index !== -1) {
        continue
      }

      this.fkr_array.push({
        id: this.utvDetail.payments[i]._fkr.id,
        code: this.utvDetail.payments[i]._fkr.code,
        name_kaz: this.utvDetail.payments[i]._fkr.name_kaz,
        name_rus: this.utvDetail.payments[i]._fkr.name_rus,
      })
    }
  }

  ngDoCheck() {

    let objString = JSON.stringify(this.utvDetail)
    let hashBeg = SHA256(objString).toString()

    if (hashBeg !== this.hashBegin && this.nochanged) {
      this.nochanged = false
      this.hashBegin = hashBeg
    }
  }

  addFKR() {
    this.utvDetailref = this.utvDetaildialog.open(FkrSelectComponent,
      {
        header: 'Выбор ФКР',
        width: '60%',
        height: '80%'
      })

    this.utvDetailref.onClose.subscribe((fkr_detail: fkr_detail) => {
      if (fkr_detail) {
        this.addSpec(fkr_detail),
          this.fkr_array.push({
            id: fkr_detail.id,
            code: fkr_detail.code,
            name_kaz: fkr_detail.name_kaz,
            name_rus: fkr_detail.name_rus
          })
      }
    }
    )
  }

  addSpec(fkr_detail: fkr_detail) {
    if (fkr_detail !== undefined) {
      this.utvDetailref = this.utvDetaildialog.open(SpecificationExpSelectComponent,
        {
          header: 'Выбор спецификации',
          width: '60%',
          height: '80%'
        })
      this.utvDetailref.onClose.subscribe((spec_detail: specification_income_detail) => {
        if (spec_detail) {
          this.pushArray(fkr_detail, spec_detail)
          this.obligats = this.utvDetail.obligats.filter(item => item['_fkr'].id == fkr_detail.id)
          this.payments = this.utvDetail.payments.filter(item => item['_fkr'].id == fkr_detail.id)
        }
      }
      )
    }
    else {
      this.utvDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите ФКР!' })
      return

    }
  }

  delSpec(utv: any) {

    for (let i = this.utvDetail.obligats.length - 1; i >= 0; i--) {
      let index = this.utvDetail.obligats.findIndex(item => utv.id === item.id)
      if (index !== -1) {
        this.utvDetail.obligats.splice(index, 1)
      }
    }
    for (let i = this.utvDetail.payments.length - 1; i >= 0; i--) {
      let index = this.utvDetail.payments.findIndex(item => utv.id === item.id)
      if (index !== -1) {
        this.utvDetail.payments.splice(index, 1)
      }
    }

    this.obligats = this.utvDetail.obligats.filter(item => item['_fkr'].id == utv._fkr.id)
    this.payments = this.utvDetail.payments.filter(item => item['_fkr'].id == utv._fkr.id)

    this.addFKRtoArray()
  }

  getColorClass(): string {
    if (this.selectedrow) {
      return 'red-row'
    }
    else {
      return ''
    }

  }

  pushArray(fkr_detail: fkr_detail, spec_detail: specification_income_detail) {
    this.utvDetail.payments.push(
      {
        id: 0,
        god: 0,
        sm1: 0,
        sm2: 0,
        sm3: 0,
        sm4: 0,
        sm5: 0,
        sm6: 0,
        sm7: 0,
        sm8: 0,
        sm9: 0,
        sm10: 0,
        sm11: 0,
        sm12: 0,
        _date: this.utvDetail.doc._date,
        _utv_exp: parseInt(this.utv_exp_id),
        _organization: this.utvDetail.doc._organization.id,
        _fkr: {
          id: fkr_detail.id,
          code: fkr_detail.code,
          name_kaz: fkr_detail.name_kaz,
          name_rus: fkr_detail.name_rus
        },
        _spec: {
          id: spec_detail.id,
          code: spec_detail.code,
          name_kaz: spec_detail.name_kaz,
          name_rus: spec_detail.name_rus
        }
      })
    this.utvDetail.obligats.push(
      {
        id: 0,
        god: 0,
        sm1: 0,
        sm2: 0,
        sm3: 0,
        sm4: 0,
        sm5: 0,
        sm6: 0,
        sm7: 0,
        sm8: 0,
        sm9: 0,
        sm10: 0,
        sm11: 0,
        sm12: 0,
        _date: this.utvDetail.doc._date,
        _utv_exp: parseInt(this.utv_exp_id),
        _organization: this.utvDetail.doc._organization.id,
        _fkr: {
          id: fkr_detail.id,
          code: fkr_detail.code,
          name_kaz: fkr_detail.name_kaz,
          name_rus: fkr_detail.name_rus
        },
        _spec: {
          id: spec_detail.id,
          code: spec_detail.code,
          name_kaz: spec_detail.name_kaz,
          name_rus: spec_detail.name_rus
        }
      })
  }

  saveDoc(close: boolean) {
    this.utvDetailService.saveUtv(this.utvDetail)
      .subscribe(
        (data) => (this.utvDetailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          this.closeaftersave(close)
        ),
        (error) => (
          this.utvDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )

  }

  filterFKR(_fkr: fkr_detail) {

    if (this.firstclick) {
      this._lastfkr = _fkr.id
      this.firstclick = false
    }

    if (this._lastfkr == _fkr.id) {
      this.allrecord = !this.allrecord
    }
    else {
      this.allrecord = false
    }

    if (!this.allrecord) {
      this.obligats = this.utvDetail.obligats.filter(item => item['_fkr'].id == _fkr.id)
      this.payments = this.utvDetail.payments.filter(item => item['_fkr'].id == _fkr.id)

      this.fkr.id = _fkr.id
      this.fkr.code = _fkr.code
      this.fkr.name_kaz = _fkr.name_kaz
      this.fkr.name_rus = _fkr.name_rus

    }
    else {
      this.obligats = this.utvDetail.obligats
      this.payments = this.utvDetail.payments

      this.fkr.id = 0
      this.fkr.code = ''
      this.fkr.name_kaz = ''
      this.fkr.name_rus = ''
    }

    this._lastfkr = _fkr.id

  }

  changedate() {
    this.utvDetail.doc._date = this.toLocaleDate(this.utvDetail.doc._date)
  }

  toLocaleDate(dateForStr: string) {
    return new Date(dateForStr).toLocaleDateString() + ' ' + new Date(dateForStr).toLocaleTimeString();
  }

  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.utvDetail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
  }

  closeform(close: boolean) {

    let objString = JSON.stringify(this.utvDetail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.utvDetailconfirm.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.utvDetailconfirm.close()
          },
          reject: () => {
            this.utvDetailconfirm.close()
          }
        })
      }
    }
  }

}
