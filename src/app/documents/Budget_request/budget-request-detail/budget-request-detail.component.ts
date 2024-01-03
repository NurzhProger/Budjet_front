import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { budjetService } from '../budget_request.servise'
import { SHA256 } from 'crypto-js';
import { FkrSelectComponent } from '../../../directory/expenses/fkr/fkr-select/fkr-select.component'
import { fkr_detail } from '../../../directory/expenses/fkr/interfaces'
import { BudgetRas4etDetailComponent } from '../../Budget_Ras4et/budget-ras4et-detail/budget-ras4et-detail.component'
import { Ras4et_head } from '../../Budget_Ras4et/Budget_ras4et.interfaces'
import { budjet_detail } from '../budget_request.interfaces';
import { SpecificationExpSelectComponent } from 'src/app/directory/expenses/specification-exp/specification-exp-select/specification-exp-select.component';
import { specification_income_detail } from 'src/app/directory/income/specification-income/interfaces';
import { form_detail, form_list_doc } from 'src/app/directory/income/forms/forms_interfaces';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { SpecificationExpDetailComponent } from 'src/app/directory/expenses/specification-exp/specification-exp-detail/specification-exp-detail.component';
import { FormlistComponent } from 'src/app/directory/income/forms/formlist/formlist.component';
import { FormSelectComponent } from 'src/app/directory/income/forms/form-select/form-select.component';
import { string } from 'mathjs';
@Component({
  selector: 'app-budget-request-detail',
  templateUrl: './budget-request-detail.component.html',
  styleUrls: ['./budget-request-detail.component.css']
})
export class BudgetRequestDetailComponent implements OnInit, DoCheck {

  constructor(
    private Budget_detail_ryref: DynamicDialogRef,
    private Budget_detail_messageServicedelSelect: MessageService,
    private Budget_detail_dialog: DialogService,
    private Budget_Servise: budjetService,
    private Budget_Confirmation: ConfirmationService) { }


  @Input() Budget_doc_id = ''
  @Output() closeEvent = new EventEmitter<any>();
  @Output() newItemEvent = new EventEmitter<any>()

  items: MenuItem[];
  form: FormGroup
  hashBegin = ''
  hashEnd = ''
  summa = 0
  firstclick = true
  statuses!: SelectItem[];
  selected = false;
  _lastfkr = 0
  allrecord = true
  responce: any = []



  fkr: fkr_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: ''
  }

  Budget_detail: budjet_detail
  //  = {
  //   doc: {
  //     id: 0,
  //     _organization: {
  //       id: 0,
  //       bin: '',
  //       name_kaz: '',
  //       name_rus: '',
  //       adress: '',
  //       codeorg: '',
  //       deleted: false,
  //       _budjet_reg: {
  //         id: 0,
  //         code: '',
  //         name_kaz: '',
  //         name_rus: ''
  //       },
  //       _regiondar: {
  //         id: 0,
  //         name: '',
  //         name_kaz: '',
  //         name_rus: ''
  //       },
  //       _abp: {
  //         id: 0,
  //         code: '',
  //         name_kaz: '',
  //         name_rus: ''
  //       },
  //       parent_organizations: [{
  //         id: 0,
  //         _date: '',
  //         _organization: 0,
  //         _parent: {
  //           id: 0,
  //           name_rus: ''
  //         }
  //       }
  //       ]
  //     },
  //     nom: '',
  //     _date: '',
  //     deleted: false,
  //     god_ucheta: '',
  //     _vid_dannyh: '',
  //     _vid_operacii: '',
  //     _vid_rashoda: '',
  //     comment: '',
  //     summ: 0
  //   },
  //   tbl: [{
  //     id: 0,
  //     _fkr: {
  //       id: 0,
  //       code: '',
  //       name_kaz: '',
  //       name_rus: ''
  //     },
  //     _spec: {
  //       id: 0,
  //       code: '',
  //       name_kaz: '',
  //       name_rus: ''
  //     },
  //     _form: {
  //       id: 0,
  //       _spec: {
  //         id: 0,
  //         code: '',
  //         name_kaz: '',
  //         name_rus: ''
  //       },
  //       name: '',
  //       head_form: '',
  //       num_app: 0
  //     },
  //     summ: 0,
  //     _planirovanie: 0
  //   }]
  // }

  godNumber: number
  nochanged = true
  fkr_array: fkr_detail[] = []
  tbl: any = []
  _vid_dannyh: any = []
  _vid_operacii: any = []
  _vid_rashoda: any = []

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

    if (this.Budget_doc_id == '') {
      this.Budget_doc_id = '0'
    }

    this.fetch_form()
    this.selectrashod()
    this.selectdannyi()
    this.selectoperacii()
  }

  changeDate() {
    let selectedDate = new Date(this.Budget_detail.doc._date);
    let selectedYear = selectedDate.getFullYear();
    if (!this.godNumber) {
      this.godNumber = selectedYear;
    }
    this.changeGodUch();
  }

  fetch_form() {
    this.Budget_Servise.fetch_detail(this.Budget_doc_id)
      .subscribe(
        (detail) => {
          this.Budget_detail = detail,
            this.tbl = this.Budget_detail.tbl,
            this.preobGodNumber(),
            this.addFKRtoArray()
        }
      )
  }

  setClassSelect_pay(id: number) {

    if (!this.allrecord && this._lastfkr == id) {
      return 'green-class'
    }
    else {
      return ''
    }
  }

  selectrashod() {
    let responce: any;
    this.Budget_Servise.fetch_vid_rashoda().subscribe(
      (data) => (
        responce = data,
        this._vid_rashoda = responce.results
      ),
      (error) => (this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  selectdannyi() {
    let responce: any;
    this.Budget_Servise.fetch_vid_dannyh().subscribe(
      (data) => (
        responce = data,
        this._vid_dannyh = responce.results
      ),
      (error) => (this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  selectoperacii() {
    let responce: any;
    this.Budget_Servise.fetch_vid_oparecii().subscribe(
      (data) => (
        responce = data,
        this._vid_operacii = responce.results
      ),
      (error) => (this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  ngDoCheck(): void {
    let objString = JSON.stringify(this.Budget_detail)
    let hashBeg = SHA256(objString).toString()

    if (hashBeg !== this.hashBegin && this.nochanged) {
      this.nochanged = false
      this.hashBegin = hashBeg
    }
  }

  addFKRtoArray() {
    this.fkr_array = []

    for (let i = 0; i < this.Budget_detail.tbl.length; i++) {

      let index = this.fkr_array.findIndex(item => this.Budget_detail.tbl[i]._fkr.id === item.id)

      if (index !== -1) {
        continue
      }

      this.fkr_array.push({
        id: this.Budget_detail.tbl[i]._fkr.id,
        code: this.Budget_detail.tbl[i]._fkr.code,
        name_kaz: this.Budget_detail.tbl[i]._fkr.name_kaz,
        name_rus: this.Budget_detail.tbl[i]._fkr.name_rus,
      })
    }
  }

  preobGodNumber() {
    this.godNumber = parseInt(this.Budget_detail.doc.god_ucheta.slice(0, 4))
    let objString = JSON.stringify(this.Budget_detail)
    this.hashBegin = SHA256(objString).toString()
  }

  changeGodUch() {
    this.Budget_detail.doc.god_ucheta = String(this.godNumber + '-01-01')
  }

  addForm(fkr_detail: fkr_detail, spec_detail: specification_income_detail) {

    if (fkr_detail !== undefined) {
      this.Budget_detail_ryref = this.Budget_detail_dialog.open(FormSelectComponent,
        {
          header: 'Выбор формы',
          width: '60%',
          height: '80%',
          data: { _spec: spec_detail.id }
        })
      this.Budget_detail_ryref.onClose.subscribe((form_detail: form_list_doc) => {
        if (form_detail) {

          this.pushArray(fkr_detail, spec_detail, form_detail)
          this.saveDoc(false)

          // let indexx = this.Budget_detail.tbl.findIndex(item => item['_spec'].id == spec_detail.id)

          // if (indexx !== -1) {
          //   this.saveNewSpecific(indexx, fkr_detail)
          // }
        }
      }
      )
    }
    else {
      this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите ФКР!' })
      return

    }
  }

  saveNewSpecific(indexx: number, fkr_detail: fkr_detail) {
    let responce: any

    this.Budget_Servise
      .saveLimit(this.Budget_detail)
      .subscribe(
        (data) => (
          responce = data,
          this.Budget_detail.tbl[indexx].id = responce.new_id,
          this.tbl = this.Budget_detail.tbl.filter(item => item['_fkr'].id == fkr_detail.id)
        ),
        (error) => (
          this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  saveDoc(close: boolean) {
    // let responce: any

    // this.tbl = this.Budget_detail.tbl
    // this.Budget_detail.tbl = this.tbl
    this.Budget_detail.doc.summ = this.Budget_detail.tbl.reduce((sum, row) => sum + row.summ, 0),
      this.Budget_Servise
        .saveLimit(this.Budget_detail)
        .subscribe(
          (data) => (
            this.responce = data,
            this.Budget_detail_messageServicedelSelect.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
            this.closeaftersave(close)
          ),
          (error) => (
            this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
          )
        )
  }

  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.Budget_detail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    } else {
      this.Budget_detail.doc.summ = this.Budget_detail.tbl.reduce((sum, row) => sum + row.summ, 0)

      if (this.Budget_doc_id !== '0') {
        this.fetch_form()
      } else {
        this.Budget_Servise.fetch_detail(string(this.responce.doc.id))
          .subscribe(
            (detail) => {
              this.Budget_detail = detail,
                this.tbl = this.Budget_detail.tbl,
                this.preobGodNumber(),
                this.addFKRtoArray()
            }
          )
      }

    }

  }



  closeform(close: boolean) {
    let objString = JSON.stringify(this.Budget_detail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.Budget_Confirmation.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.Budget_Confirmation.close()
          },
          reject: () => {
            this.Budget_Confirmation.close()
          }
        })
      }
    }
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
      this.tbl = this.Budget_detail.tbl.filter(item => item['_fkr'].id == _fkr.id)

      this.fkr.id = _fkr.id
      this.fkr.code = _fkr.code
      this.fkr.name_kaz = _fkr.name_kaz
      this.fkr.name_rus = _fkr.name_rus

    }
    else {
      this.tbl = this.Budget_detail.tbl

      this.fkr.id = 0
      this.fkr.code = ''
      this.fkr.name_kaz = ''
      this.fkr.name_rus = ''
    }

    this._lastfkr = _fkr.id
  }

  selectspec() {

  }


  viewFKR(fkr_id: number) {

  }

  editFKR(ri: number) {
    this.Budget_detail_ryref = this.Budget_detail_dialog.open(FkrSelectComponent,
      {
        header: 'Выбор ФКР',
        width: '60%',
        height: '80%'
      })
    this.Budget_detail_ryref.onClose.subscribe((fkr: fkr_detail) => {
      if (fkr) {
        this.Budget_detail.tbl[ri]._fkr = {
          id: fkr.id,
          code: fkr.code,
          name_kaz: fkr.name_kaz,
          name_rus: fkr.name_rus
        }
      }
    })
  }

  viewForma(index: number) {
    this.Budget_detail_ryref = this.Budget_detail_dialog.open(BudgetRas4etDetailComponent,
      {
        header: 'Редактирование Формы',
        width: '60%',
        height: '80%',
        data: { formaid: this.Budget_detail.tbl[index]._form }
      })

    this.Budget_detail_ryref.onClose.subscribe((form: Ras4et_head) => {
      if (form) {
        this.Budget_detail.tbl[index]._form.id = form.id,
          this.Budget_detail.tbl[index]._form.head_form = form._form.head_form,
          this.Budget_detail.tbl[index]._form.name = form._form.name
      }
    })
  }

  delReq(ind: number, code: number) {
    this.Budget_Confirmation.confirm({
      message: 'Вы действительно хотите специфику ' + code + '?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.tbl.splice(ind, 1)
        let tek = this.tbl[ind]
        // let dd = this.Budget_detail.tbl.filter(item => item._fkr == tek._fkr && item._spec == tek._spec && item._form == tek._form)
        // s.log(dd);
        for (let i = 0; i < this.Budget_detail.tbl.length; i++) {
          if (this.Budget_detail.tbl[i]._fkr == tek._fkr && this.Budget_detail.tbl[i]._spec == tek._spec && this.Budget_detail.tbl[i]._form == tek._form) {
            this.Budget_detail.tbl.splice(i, 1)
          }
        }
        this.tbl = []
        this.tbl = this.Budget_detail.tbl

        // for (let ff in this.tbl) {
        // this.tbl = this.Budget_detail.tbl.filter(item => item.id !== )
        // }
        this.Budget_Confirmation.close()
        if (this.Budget_doc_id !== '0') {
          // this.saveDoc(false)
        }
      },
      reject: () => {
        this.Budget_Confirmation.close();
      }
    });

  }

  onRowEdit(izm: any, ri: number) {

    this.Budget_detail_ryref = this.Budget_detail_dialog.open(BudgetRas4etDetailComponent,
      {
        header: 'Редактирование расчетной таблицы',
        width: '100%',
        height: '100%',
        data: {
          data: izm,
          period: this.Budget_detail.doc._date
        }
      })

    this.Budget_detail_ryref.onClose.subscribe((detail: any) => {

      if (detail) {
        izm.summ = detail.head.summ,
          this.Budget_detail.doc.summ = this.Budget_detail.tbl.reduce((sum, row) => sum + row.summ, 0)

        this.saveDoc(false)
      }
    })
    // this.fetch_form()
    // this.newItemEvent.emit({ params: { selector: 'app-budget-ras4et-detail', nomer: 'Расшифровка заявки ' + izm._form.name, id: izm } });
  }

  pushArray(fkr_detail: fkr_detail, spec_detail: specification_income_detail, form_detail: form_list_doc) {
    this.Budget_detail.tbl.push(
      {
        id: 0,
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
        },
        _form: {
          id: form_detail.id,
          _spec: form_detail._spec,
          name: form_detail.name,
          head_form: form_detail.head_form,
          head_form_kaz: form_detail.head_form_kaz,
          num_app: form_detail.num_app
        },
        summ: 0,
        _planirovanie: this.Budget_detail.doc.id
      })
    this.tbl = this.Budget_detail.tbl
  }

  addSpec(fkr_detail: fkr_detail) {
    if (fkr_detail !== undefined) {
      this.Budget_detail_ryref = this.Budget_detail_dialog.open(SpecificationExpSelectComponent,
        {
          header: 'Выбор спецификации',
          width: '60%',
          height: '80%'
        })
      this.Budget_detail_ryref.onClose.subscribe((spec_detail: specification_income_detail) => {
        if (spec_detail) {
          this.addForm(fkr_detail, spec_detail)
        }
      }
      )
    }
    else {
      this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите ФКР!' })
      return

    }
  }

  add_fkr() {


    this.Budget_detail_ryref = this.Budget_detail_dialog.open(FkrSelectComponent,
      {
        header: 'Выбор ФКР',
        width: '60%',
        height: '80%',
        data: { _org_id: this.Budget_detail.doc._organization.id }
      })

    this.Budget_detail_ryref.onClose.subscribe((fkr_detail: fkr_detail) => {
      if (fkr_detail) {
        // this.addSpec(fkr_detail),
        if (this.fkr_array.length > 0) {
          for (let i = 0; i < this.fkr_array.length; i++) {
            let index = this.fkr_array.find(item => item.id === fkr_detail.id)
            if (index == undefined) {
              this.fkr_array.push({
                id: fkr_detail.id,
                code: fkr_detail.code,
                name_kaz: fkr_detail.name_kaz,
                name_rus: fkr_detail.name_rus
              })
            }
            break
          }
        } else {
          this.fkr_array.push({
            id: fkr_detail.id,
            code: fkr_detail.code,
            name_kaz: fkr_detail.name_kaz,
            name_rus: fkr_detail.name_rus
          })
        }

        // this.fetch_form()
      }
    }
    )

  }

  add_dopl() {

  }

  deleted_tbl(index: number) {

  }

  deleted_dopl(index: number) {

  }


  viewOrg() {
    this.Budget_detail_ryref = this.Budget_detail_dialog.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this.Budget_detail.doc._organization.id }
      })

    this.Budget_detail_ryref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.Budget_detail.doc._organization.id = org.id,
          this.Budget_detail.doc._organization.name_rus = org.name_rus
      }
    })
  }

  selectOrg() {
    this.Budget_detail_ryref = this.Budget_detail_dialog.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.Budget_detail_ryref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.Budget_detail.doc._organization.id = org.id,
          this.Budget_detail.doc._organization.name_rus = org.name_rus
      }
    })
  }

  toLocaleDate(dateForStr: string) {
    return new Date(dateForStr).toLocaleDateString() + ' ' + new Date(dateForStr).toLocaleTimeString();
  }

  exportExcel() {
    this.Budget_Servise
      .gettablexls(this.Budget_doc_id)
  }




}
