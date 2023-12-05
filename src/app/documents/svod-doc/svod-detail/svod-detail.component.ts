import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { svod_detail, svod_list } from '../interfaces';
import { SvodService } from '../svod.servise';
import { SHA256 } from 'crypto-js';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { boolean, i, log, string } from 'mathjs';
import { fkr_detail } from 'src/app/directory/expenses/fkr/interfaces';
import { BudjetRequestSelectComponent } from '../../Budget_request/budjet-request-select/budjet-request-select/budjet-request-select.component';
import { Observable } from 'rxjs';
import { budjet_doc } from '../../Budget_request/budget_request.interfaces';
import { budjetService } from '../../Budget_request/budget_request.servise';

@Component({
  selector: 'app-svod-detail',
  templateUrl: './svod-detail.component.html',
  styleUrls: ['./svod-detail.component.css']
})
export class SvodDetailComponent implements OnInit {
  @Input() svod_id = ''
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>();
  @Output() newItemEvent = new EventEmitter<any>()

  constructor(
    private svodService: SvodService,
    private svod_Message_Service: MessageService,
    private svod_Confirm_Service: ConfirmationService,
    private svod_detail_Rer: DynamicDialogRef,
    private svod_Dialog_Service: DialogService,
    private budjetService: budjetService

  ) { }
  items: MenuItem[];
  Svod_list$: Observable<svod_list>
  tbl: any = []
  svod_detail: svod_detail
  godNumber: number
  hashBegin = ''
  hashEnd = ''
  form: FormGroup
  _vid_rashoda: any = []
  _vid_dannyh: any = []
  _vid_operacii: any = []
  fkr_array: fkr_detail[] = []
  firstclick = true
  _lastfkr = ''
  allrecord = true
  fkr: fkr_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: ''
  }
  first = 0
  rows = 25
  search = ''

  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      god_ucheta: new FormControl(null, [Validators.required]),
      vid_rashoda: new FormControl(null, [Validators.required]),
      vid_dannyh: new FormControl(null, [Validators.required]),
      vid_operacii: new FormControl(null, [Validators.required]),
      summ: new FormControl(null)
    })
    this.selectrashod()
    this.selectdannyi()
    this.selectoperacii()
    if (this.svod_id !== '') {
      this.svodService.fetch_detail(this.svod_id)
        .subscribe(
          (detail) => {
            this.svod_detail = detail,
              this.tbl = this.svod_detail.tbl_plan,
              this.preobGodNumber(),
              this.addFKRtoArray()
          }
        )
    }
  }

  addFKRtoArray() {
    this.fkr_array = []

    for (let i = 0; i < this.svod_detail.tbl_plan.length; i++) {

      let index = this.fkr_array.findIndex(item => this.svod_detail.tbl_plan[i].fkr_code === item.code)

      if (index !== -1) {
        continue
      }

      this.fkr_array.push({
        id: 0,
        code: this.svod_detail.tbl_plan[i].fkr_code,
        name_kaz: '',
        name_rus: '',
      })


    }
  }
  fetchCat() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.search.toString()
    }

    this.Svod_list$ = this.svodService.fetch(params)

  }

  filterFKR(_fkr: fkr_detail) {
    if (this.firstclick) {
      this._lastfkr = _fkr.code
      this.firstclick = false
    }

    if (this._lastfkr == _fkr.code) {
      this.allrecord = !this.allrecord
    }
    else {
      this.allrecord = false
    }

    if (!this.allrecord) {
      this.tbl = this.svod_detail.tbl_plan.filter(item => item.fkr_code == _fkr.code)

      this.fkr.id = _fkr.id
      this.fkr.code = _fkr.code
      this.fkr.name_kaz = _fkr.name_kaz
      this.fkr.name_rus = _fkr.name_rus

    }
    else {
      this.tbl = this.svod_detail.tbl_plan

      this.fkr.id = 0
      this.fkr.code = ''
      this.fkr.name_kaz = ''
      this.fkr.name_rus = ''
    }
    this._lastfkr = _fkr.code
  }

  delSvod(ind: number) {
    this.svod_Confirm_Service.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let tir = this.svod_detail.tbl[ind]
        for (let i = 0; i < this.svod_detail.tbl.length; i++) {
          if (this.svod_detail.tbl[i]._planirovanie == tir._planirovanie) {
            this.svod_detail.tbl.splice(i, 1)
          }
        }
        this.tbl.splice(ind, 1)
        this.svod_Confirm_Service.close()
        this.saveDoc(false)
        this.svodService.fetch_detail(this.svod_id)
      },
      reject: () => {
        this.svod_Confirm_Service.close();
      }
    })
  }
  setClassSelect_pay(code: string) {

    if (!this.allrecord && this._lastfkr == code) {
      return 'green-class'
    }
    else {
      return ''
    }
  }
  selectrashod() {
    let responce: any;
    this.svodService.fetch_vid_rashoda().subscribe(
      (data) => (
        responce = data,
        this._vid_rashoda = responce.results
      ),
      (error) => (this.svod_Message_Service.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  selectdannyi() {
    let responce: any;
    this.svodService.fetch_vid_dannyh().subscribe(
      (data) => (
        responce = data,
        this._vid_dannyh = responce.results
      ),
      (error) => (this.svod_Message_Service.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  selectoperacii() {
    let responce: any;
    this.svodService.fetch_vid_oparecii().subscribe(
      (data) => (
        responce = data,
        this._vid_operacii = responce.results
      ),
      (error) => (this.svod_Message_Service.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  preobGodNumber() {
    this.godNumber = parseInt(this.svod_detail.head.god_ucheta.slice(0, 4))
    let objString = JSON.stringify(this.svod_detail)
    this.hashBegin = SHA256(objString).toString()
  }
  changeGodUch() {
    this.svod_detail.head.god_ucheta = String(this.godNumber + '-01-01')
  }
  saveDoc(close: boolean) {

    this.tbl = this.svod_detail.tbl
    this.svod_detail.tbl = this.tbl

    this.svodService
      .saveSvod(this.svod_detail)
      .subscribe(
        (data) => (
          this.svod_Message_Service.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          this.closeaftersave(close)
        ),
        (error) => (
          this.svod_Message_Service.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )

  }
  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.svod_detail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
  }
  closeform(close: boolean) {
    let objString = JSON.stringify(this.svod_detail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.svod_Confirm_Service.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.svod_Confirm_Service.close()
          },
          reject: () => {
            this.svod_Confirm_Service.close()
          }
        })
      }
    }
  }
  viewOrg() {
    this.svod_detail_Rer = this.svod_Dialog_Service.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this.svod_detail.head._organization.id }
      })

    this.svod_detail_Rer.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.svod_detail.head._organization.id = org.id,
          this.svod_detail.head._organization.name_rus = org.name_rus
      }
    })
  }
  selectOrg() {
    this.svod_detail_Rer = this.svod_Dialog_Service.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.svod_detail_Rer.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.svod_detail.head._organization.id = org.id,
          this.svod_detail.head._organization.name_rus = org.name_rus
      }
    })
  }
  openNew() {
    this.svod_detail_Rer = this.svod_Dialog_Service.open(BudjetRequestSelectComponent,
      {
        header: 'Выбор заявки',
        width: '80%',
        height: '100%',
      })

    this.svod_detail_Rer.onClose.subscribe((budjet: budjet_doc) => {
      let close: boolean
      if (budjet) {
        if (this.svod_detail.tbl.length > 0) {
          for (let i = 0; i < this.svod_detail.tbl.length; i++) {
            let index = this.svod_detail.tbl.find(item => item._planirovanie.id === budjet.id)
            if (index == undefined) {
              this.svod_detail.tbl.push({
                id: budjet.id,
                _planirovanie: {
                  nom: budjet.nom,
                  id: budjet.id,
                  org_name: budjet._organization.name_rus
                },
                summ: budjet.summ
              })
              let id: string
              id = string(budjet.id)
              let aaa: any
              this.budjetService.fetch_detail(id)
                .subscribe(
                  (detail) => {
                    aaa = detail.tbl
                    for (let i = 0; i < aaa.length; i++) {
                      this.svod_detail.tbl_plan.push({
                        fkr_code: aaa[i]._fkr.code,
                        ekr_code: aaa[i]._spec.name_rus,
                        form_name: aaa[i]._form.name,
                        form_head: aaa[i]._form.head_form,
                        summ: aaa[i].summ
                      })
                    }
                    this.tbl = this.svod_detail.tbl_plan
                    this.addFKRtoArray()
                  }
                )
              // this.saveDoc(close = false)
            }
            break
          }
        } else {
          let id: string
          id = string(budjet.id)
          let aaa: any
          this.svod_detail.tbl.push({
            id: budjet.id,
            _planirovanie: {
              nom: budjet.nom,
              id: budjet.id,
              org_name: budjet._organization.name_rus
            },
            summ: budjet.summ
          })
          this.budjetService.fetch_detail(id)
            .subscribe(
              (detail) => {
                aaa = detail.tbl
                for (let i = 0; i < aaa.length; i++) {
                  this.svod_detail.tbl_plan.push({
                    fkr_code: aaa[i]._fkr.code,
                    ekr_code: aaa[i]._spec.name_rus,
                    form_name: aaa[i]._form.name,
                    form_head: aaa[i]._form.head_form,
                    summ: aaa[i].summ
                  })
                }
                this.tbl = this.svod_detail.tbl_plan
                this.addFKRtoArray()
              }
            )
        }
        this.saveDoc(close = false)
      }
    })
  }

}
