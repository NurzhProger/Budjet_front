import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClassificationIncomeDetailComponent } from 'src/app/directory/income/classification-income/classification-income-detail/classification-income-detail.component';
import { classsification_income } from 'src/app/directory/income/classification-income/interfaces';
import { utv_income_detail } from '../interfaces';
import { UtvIncomeService } from '../utv_income.service';
import { SHA256 } from 'crypto-js';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { ClassificationIncomeSelectComponent } from 'src/app/directory/income/classification-income/classification-income-select/classification-income-select.component';
import { Budjet_detail } from 'src/app/directory/income/budjet/interfaces';

@Component({
  selector: 'app-utv-income-detail',
  templateUrl: './utv-income-detail.component.html',
  styleUrls: ['./utv-income-detail.component.css']
})
export class UtvIncomeDetailComponent implements OnInit, DoCheck {

  constructor(
    private utvDetailService: UtvIncomeService,
    private utvDetailmsg: MessageService,
    private utvDetailref: DynamicDialogRef,
    private utvDetaildialog: DialogService,
    private utvDetailconfirm: ConfirmationService,
  ) {
    this.items = [
      {
        label: 'Записать',
        icon: 'pi pi-save',
        command: () => {
          this.saveDoc(false);
        }
      },
      // {
      //   label: 'Пометка на удаление',
      //   icon: 'pi pi-times',
      //   command: () => {
      //     this.onDelete();
      //   }
      // }
    ]
  }

  @Input() utv_inc_id = ''
  @Output() closeEvent = new EventEmitter<any>();

  items: MenuItem[];
  form: FormGroup

  budj_det: Budjet_detail = {
    adress: '',
    code: '',
    id: 0,
    name_kaz: '',
    name_rus: ''
  }

  utvDetail: utv_income_detail = {
    doc: {
      id: 0,
      org_name: '',
      budjet_name: '',
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
      },
      _budjet: 0
    },
    tbl1: [{
      id: 0,
      deleted: false,
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
      _organization: 0,
      _utv_inc: 0,
      _classification: {
        id: 0,
        code: '',
        name_kaz: '',
        name_rus: ''
      }
    }]
  }
  responce: any
  hashBegin = ''
  hashEnd = ''
  nochanged = true
  selected = false

  totalgod = 0
  total1 = 0
  total2 = 0
  total3 = 0
  total4 = 0
  total5 = 0
  total6 = 0
  total7 = 0
  total8 = 0
  total9 = 0
  total10 = 0
  total11 = 0
  total12 = 0

  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null, [Validators.required]),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      // budjet_name: new FormControl(null, [Validators.required])
    })

    if (this.utv_inc_id !== '') {
      this.utvDetailService.fetch_detail(this.utv_inc_id)
        .subscribe(
          (detail) => {
            this.utvDetail = detail,
              this.calculate(),
              console.log(detail)
              
          }
        )
    }
    else {
      this.utvDetail = {
        doc: {
          id: 0,
          org_name: '',
          budjet_name: '',
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
          },
          _budjet: 0
        },
        tbl1: [{
          id: 0,
          deleted: false,
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
          _organization: 0,
          _utv_inc: 0,
          _classification: {
            id: 0,
            code: '',
            name_kaz: '',
            name_rus: ''
          }
        }]
      }

      this.utvDetail.tbl1.splice(0, this.utvDetail.tbl1.length)
    }

    let objString = JSON.stringify(this.utvDetail)
    this.hashBegin = SHA256(objString).toString()

  }

  ngDoCheck() {

    let objString = JSON.stringify(this.utvDetail)
    let hashBeg = SHA256(objString).toString()

    if (hashBeg !== this.hashBegin && this.nochanged) {
      this.nochanged = false
      this.hashBegin = hashBeg
    }
  }

  calculate() {
    let total1 = 0
    let total2 = 0
    let total3 = 0
    let total4 = 0
    let total5 = 0
    let total6 = 0
    let total7 = 0
    let total8 = 0
    let total9 = 0
    let total10 = 0
    let total11 = 0
    let total12 = 0
    let totalgod = 0

    for (let tot of this.utvDetail.tbl1) {
      total1 += tot.sm1
      total2 += tot.sm2
      total3 += tot.sm3
      total4 += tot.sm4
      total5 += tot.sm5
      total6 += tot.sm6
      total7 += tot.sm7
      total8 += tot.sm8
      total9 += tot.sm9
      total10 += tot.sm10
      total11 += tot.sm11
      total12 += tot.sm12
      totalgod += tot.sm1 + tot.sm2 + tot.sm3 + tot.sm4 + tot.sm7 + tot.sm6 +
        tot.sm7 + tot.sm8 + tot.sm9 + tot.sm10 + tot.sm11 + tot.sm12
    }

    this.totalgod = totalgod
    this.total1 = total1
    this.total2 = total2
    this.total3 = total3
    this.total4 = total4
    this.total5 = total5
    this.total6 = total6
    this.total7 = total7
    this.total8 = total8
    this.total9 = total9
    this.total10 = total10
    this.total11 = total11
    this.total12 = total12

  }

  addClassification() {
    this.utvDetailref = this.utvDetaildialog.open(ClassificationIncomeSelectComponent,
      {
        header: 'Выбор классификации',
        width: '60%',
        height: '80%'
      })

    this.utvDetailref.onClose.subscribe((classific: classsification_income) => {
      if (classific) {
        this.utvDetail.tbl1.push(
          {
            _classification: {
              id: classific.id,
              code: classific.code,
              name_kaz: classific.name_kaz,
              name_rus: classific.name_rus
            },
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
            deleted: false,
            _organization: 0,
            _utv_inc: 0,
            _date: this.utvDetail.doc._date
          })
      }
    })
  }

  editClassification(ri:number) {
    this.utvDetailref = this.utvDetaildialog.open(ClassificationIncomeSelectComponent,
      {
        header: 'Выбор классификации',
        width: '60%',
        height: '80%'
      })

    this.utvDetailref.onClose.subscribe((classific: classsification_income) => {
      if (classific) {
        this.utvDetail.tbl1[ri]._classification = {
              id: classific.id,
              code: classific.code,
              name_kaz: classific.name_kaz,
              name_rus: classific.name_rus
            }
      }
    })
  }

  viewClassification(classif_inc_id: number) {
    this.utvDetailref = this.utvDetaildialog.open(ClassificationIncomeDetailComponent,
      {
        header: 'Редактирование классификации',
        width: '60%',
        height: '40%',
        data: { classif_id: classif_inc_id }
      })

  }

  saveDoc(close: boolean): void {
    let responce: any

    this.utvDetailService.saveUtv(this.utvDetail)
      .subscribe(
        (data) => (
          this.utvDetailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          responce = data, this.utvDetail = responce, this.closeaftersave(close)
        ),
        (error) => (
          this.utvDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  onDelete(classification_id: number, classification_name: string) {
    this.utvDetailconfirm.confirm({
      message: 'Вы действительно хотите удалить ' + classification_name + '?',
      header: 'Удаление классификации',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let i = this.utvDetail.tbl1.length - 1; i >= 0; i--) {
          let index = this.utvDetail.tbl1.findIndex(item => classification_id === item._classification.id)
          if (index !== -1) {
            this.utvDetail.tbl1.splice(index, 1)
          }
        }
        this.utvDetailconfirm.close()
      },
      reject: () => {
        this.utvDetailconfirm.close();
      }
    });
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

  changedate() {
    this.utvDetail.doc._date = this.toLocaleDate(this.utvDetail.doc._date)
  }

  toLocaleDate(dateForStr: string) {
    return new Date(dateForStr).toLocaleDateString() + ' ' + new Date(dateForStr).toLocaleTimeString()
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
