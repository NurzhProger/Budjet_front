import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClassificationIncomeDetailComponent } from 'src/app/directory/income/classification-income/classification-income-detail/classification-income-detail.component';
import { ClassificationIncomeSelectComponent } from 'src/app/directory/income/classification-income/classification-income-select/classification-income-select.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { izm_inc_doc_detail } from '../interfaces';
import { IzmIncomeService } from '../izm_income.service';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-izm-inc-doc-detail',
  templateUrl: './izm-inc-doc-detail.component.html',
  styleUrls: ['./izm-inc-doc-detail.component.css']
})
export class IzmIncDocDetailComponent implements OnInit, DoCheck {

  constructor(
    private izmDetailService: IzmIncomeService,
    private izmDetailmsg: MessageService,
    private izmDetailref: DynamicDialogRef,
    private izmDetaildialog: DialogService,
    private izmDetailconfirm: ConfirmationService,
  ) { }

  @Input() izm_inc_id = ''
  @Output() closeEvent = new EventEmitter<any>()
  @Output() closeed = false
  items: MenuItem[];
  form: FormGroup
  izmDetail: izm_inc_doc_detail
  responce: any
  nochanged = true
  hashBegin = ''
  hashEnd = ''
  selected = false
  spravkatypes: any = []
  TotalUtvGod = 0
  TotalUtv1 = 0
  TotalUtv2 = 0
  TotalUtv3 = 0
  TotalUtv4 = 0
  TotalUtv5 = 0
  TotalUtv6 = 0
  TotalUtv7 = 0
  TotalUtv8 = 0
  TotalUtv9 = 0
  TotalUtv10 = 0
  TotalUtv11 = 0
  TotalUtv12 = 0
  TotalIzmGod = 0
  TotalIzm1 = 0
  TotalIzm2 = 0
  TotalIzm3 = 0
  TotalIzm4 = 0
  TotalIzm5 = 0
  TotalIzm6 = 0
  TotalIzm7 = 0
  TotalIzm8 = 0
  TotalIzm9 = 0
  TotalIzm10 = 0
  TotalIzm11 = 0
  TotalIzm12 = 0
  TotalGod = 0
  Total1 = 0
  Total2 = 0
  Total3 = 0
  Total4 = 0
  Total5 = 0
  Total6 = 0
  Total7 = 0
  Total8 = 0
  Total9 = 0
  Total10 = 0
  Total11 = 0
  Total12 = 0

  closeform(close: boolean) {

    let objString = JSON.stringify(this.izmDetail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.izmDetailconfirm.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.izmDetailconfirm.close()
          },
          reject: () => {
            this.izmDetailconfirm.close()
          }
        })
      }
    }
  }

  gettypespr() {
    this.izmDetailService.gettypespr()
      .subscribe(
        (data) => (
          this.spravkatypes = data
        )
      )
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null, [Validators.required]),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      type_name: new FormControl(null, [Validators.required])
    })
    this.gettypespr()
    if (this.izm_inc_id !== '') {
      this.izmDetailService.fetch_detail(this.izm_inc_id)
        .subscribe(
          (detail) => {
            this.izmDetail = detail,
            this.calculatetot()
          }
        )
    }
    else {
      this.izmDetail = {
        doc: {
          id: 0,
          nom: '',
          _date: '',
          deleted: false,
          _organization: 0,
          org_name: '',
          _budjet: 0,
          budjet_name: '',
          _type_izm_doc: 0,
          type_izm_name: ''
        },
        tbl1: [{
          id: 0,
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
          utv1: 0,
          utv2: 0,
          utv3: 0,
          utv4: 0,
          utv5: 0,
          utv6: 0,
          utv7: 0,
          utv8: 0,
          utv9: 0,
          utv10: 0,
          utv11: 0,
          utv12: 0,
          itog1: 0,
          itog2: 0,
          itog3: 0,
          itog4: 0,
          itog5: 0,
          itog6: 0,
          itog7: 0,
          itog8: 0,
          itog9: 0,
          itog10: 0,
          itog11: 0,
          itog12: 0,
          _classification: {
            id: 0,
            code: '',
            name_kaz: '',
            name_rus: ''
          }
          
        }]
      }

      this.izmDetail.tbl1.splice(0, this.izmDetail.tbl1.length)
    }

    let objString = JSON.stringify(this.izmDetail)
    this.hashBegin = SHA256(objString).toString()

  }

  calculatetot() {
    let asd:any;
    let self:any;
    console.log(this.izmDetail.tbl1)
    self = this
    asd = self.izmDetail.tbl1
    let TotUtvGod = 0
    let TotUtv = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    let TotIzmGod = 0
    let TotIzm = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    let TotGod = 0
    let Tot = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    for (let str of asd) {
      for (let i of [1,2,3,4,5,6,7,8,9,10,11,12]) {
        TotUtv[i] += str['utv'+i],
        TotIzm[i] += str['sm'+i],
        Tot[i] += str['itog'+i]
      }
    }
    for (let i of [1,2,3,4,5,6,7,8,9,10,11,12]) {
      self['TotalUtv'+i]  = TotUtv[i],
      self['TotalIzm'+i]  = TotIzm[i],
      self['Total'+i]     = Tot[i],
      TotUtvGod           += TotUtv[i],
      TotIzmGod           += TotIzm[i],
      TotGod              += Tot[i]
    }
    this.TotalIzmGod  = TotIzmGod,
    this.TotalUtvGod  = TotUtvGod,
    this.TotalGod     = TotGod
  }
  ngDoCheck() {

    let objString = JSON.stringify(this.izmDetail)
    let hashBeg = SHA256(objString).toString()

    if (hashBeg !== this.hashBegin && this.nochanged) {
      this.nochanged = false
      this.hashBegin = hashBeg
    }
  }

  sumColumn(izm: any, i: number) {

    izm["itog" + i] = izm["sm" + i] + izm["utv" + i]

  }

  editClassification(ri: number) {
    this.izmDetailref = this.izmDetaildialog.open(ClassificationIncomeSelectComponent,
      {
        header: 'Выбор классификации',
        width: '60%',
        height: '80%'
      })

    this.izmDetailref.onClose.subscribe((classific: any) => {
      if (classific) {
        this.izmDetail.tbl1.splice(ri, 1)
        this.addClassificationRow(classific)
      }
    })
  }

  viewClassification(classif_inc_id: number) {
    this.izmDetailref = this.izmDetaildialog.open(ClassificationIncomeDetailComponent,
      {
        header: 'Редактирование классификации',
        width: '60%',
        height: '40%',
        data: { classif_id: classif_inc_id }
      })

  }

  addClassification() {
    this.izmDetailref = this.izmDetaildialog.open(ClassificationIncomeSelectComponent,
      {
        header: 'Выбор классификации',
        width: '60%',
        height: '80%'
      })

    this.izmDetailref.onClose.subscribe((classific: any) => {
      if (classific) {
        this.addClassificationRow(classific)
      }
    })

  }

  addClassificationRow(classific_id: any) {
    let params = {
      _organization: this.izmDetail.doc._organization,
      date: this.izmDetail.doc._date,
      _classification: classific_id.id
    }

    this.izmDetailService.getOstatok(params)
      .subscribe(
        (data) => (
          data.forEach((item: any) => {
            item.id = 0
            item._classification = classific_id
            this.izmDetail.tbl1.push(item)
          })
        )
      )
  }

  saveDoc(close: boolean): void {

    this.izmDetailService.saveIzm(this.izmDetail)
      .subscribe(
        (data) => (
          this.izmDetailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          this.closeaftersave(close)
        ),
        (error) => (
          this.izmDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.izmDetail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
  }

  selectOrg() {
    this.izmDetailref = this.izmDetaildialog.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.izmDetailref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.izmDetail.doc._organization = org.id,
          this.izmDetail.doc.org_name = org.name_rus
      }
    })
  }

  viewOrg() {
    this.izmDetailref = this.izmDetaildialog.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this.izmDetail.doc._organization }
      })

    this.izmDetailref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.izmDetail.doc._organization = org.id,
          this.izmDetail.doc.org_name = org.name_rus
      }
    })
  }

  onDelete(ri: number, classification_name: string) {
    this.izmDetailconfirm.confirm({
      message: 'Вы действительно хотите удалить ' + classification_name + '?',
      header: 'Удаление классификации',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.izmDetail.tbl1.splice(ri, 1)
        this.izmDetailconfirm.close()
      },
      reject: () => {
        this.izmDetailconfirm.close()
      }
    })
  }

  // deleteRow(_classification_id: number) {
  //   for (let i = this.izmDetail.tbl1.length - 1; i >= 0; i--) {
  //     let index = this.izmDetail.tbl1.findIndex(item => _classification_id === item._classification)

  //     if (index !== -1) {
  //       this.izmDetail.tbl1.splice(index, 1)
  //     }
  //   }
  // }

  changedate() {
    this.izmDetail.doc._date = this.toLocaleDate(this.izmDetail.doc._date)
  }

  toLocaleDate(dateForStr: string) {
    return new Date(dateForStr).toLocaleDateString() + ' ' + new Date(dateForStr).toLocaleTimeString();
  }


}
