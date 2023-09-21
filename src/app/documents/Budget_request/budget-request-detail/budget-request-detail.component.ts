import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService,SelectItem  } from 'primeng/api';
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
    private Budget_Servise:budjetService,
    private Budget_Confirmation:ConfirmationService)  { }


  @Input() Budget_doc_id = ''
  @Output() closeEvent = new EventEmitter<any>();

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
  
  fkr: fkr_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: ''
  }



  Budget_detail: budjet_detail = {
    doc: {
      id: 0,
      _organization: {
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
        }
      },
      nom: '',
      _date: '',
      deleted: false,
      god_ucheta: '',
      _vid_dannyh: '',
      _vid_operacii: '',
      _vid_rashoda: ''
    },
    tbl: [{
      id: 0,
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
      },
      _form: {
        id: 0,
        _spec: {
          id: 0,
          code: '',
          name_kaz: '',
          name_rus: ''
        },
        name: '',
        head_form: '',
        num_app: 0
      },
      summ: 0,
      _planirovanie: 0
    }]
  }

  godNumber: number
  nochanged = true
  fkr_array: fkr_detail[] = []
  tbl: any = []


  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      god_ucheta: new FormControl(null, [Validators.required])
    })

    if (this.Budget_doc_id !== '') {
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
    // else {
    //   this.Budget_detail = {
    //     doc: {
    //       id: 0,
    //       org_name: "",
    //       _organization: {
    //         id: 0,
    //         bin: "",
    //         name_kaz: "",
    //         name_rus: "",
    //         adress: "",
    //         deleted: false,
    //         budjet_name: "",
    //         region_name: "",
    //         _budjet_reg: 0,
    //         _regiondar: 0,
    //       },
    //       _date: "",
    //       nom:"",
    //       god_ucheta: "",
    //       _vid_dannyh: "",
    //       _vid_operacii: "",
    //       deleted: false,
    //     },
    //     tbl: [{
    //       id: 0,
    //       _planirovanie: 0,
    //       summ: 0,
    //       _fkr: 0,
    //       fkrname: "",
    //       fkrcode: "",
    //       _spec: 0,
    //       specname: "",
    //       speccode: "",
    //       _form: 0,
    //       formname: "",
    //       formhead: ""
    //     }]
    //   }


    // }

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

  saveDoc(set:boolean){

  }

  closeform(close: boolean){
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

  selectspec(){

  }


  viewFKR(fkr_id: number) {

  }

  editFKR(ri:number) {
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

  viewForma(index:number){
    this.Budget_detail_ryref = this.Budget_detail_dialog.open(BudgetRas4etDetailComponent,
      {
        header: 'Редактирование Формы',
        width: '60%',
        height: '80%',
        data: { formaid: this.Budget_detail.tbl[index]._form}
      })

    this.Budget_detail_ryref.onClose.subscribe((form: Ras4et_head) => {
      if (form) {
        this.Budget_detail.tbl[index]._form.id = form.id,
        this.Budget_detail.tbl[index]._form.head_form = form.formhead,
        this.Budget_detail.tbl[index]._form.name = form.formname
      }
    })
  }

  onRowClick(budjet: budjet_detail) {
    console.log(budjet);
    
  }

  pushArray(fkr_detail: fkr_detail, spec_detail: specification_income_detail) {
    // this.Budget_detail.tbl.push(
    //   {
    //     id: 0,
    //     _fkr: {
    //       id: fkr_detail.id,
    //       code: fkr_detail.code,
    //       name_kaz: fkr_detail.name_kaz,
    //       name_rus: fkr_detail.name_rus
    //     },
    //     _spec: {
    //       id: spec_detail.id,
    //       code: spec_detail.code,
    //       name_kaz: spec_detail.name_kaz,
    //       name_rus: spec_detail.name_rus
    //     },
    //     _form: {
    //       id: 0,
          
    //     }
        
    //   })
  }

  addSpec(fkr_detail: fkr_detail) {
    // if (fkr_detail !== undefined) {
    //   this.Budget_detail_ryref = this.Budget_detail_dialog.open(SpecificationExpSelectComponent,
    //     {
    //       header: 'Выбор спецификации',
    //       width: '60%',
    //       height: '80%'
    //     })
    //   this.Budget_detail_ryref.onClose.subscribe((spec_detail: specification_income_detail) => {
    //     if (spec_detail) {
    //       this.pushArray(fkr_detail, spec_detail)
    //       this.tbl = this.Budget_detail.tbl.filter(item => item['_fkr'].id == fkr_detail.id)
    //     }
    //   }
    //   )
    // }
    // else {
    //   this.utvDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите ФКР!' })
    //   return

    // }
  }

  add_tbl(){

  }

  add_fkr() {
    this.Budget_detail_ryref = this.Budget_detail_dialog.open(FkrSelectComponent,
      {
        header: 'Выбор ФКР',
        width: '60%',
        height: '80%'
      })

    this.Budget_detail_ryref.onClose.subscribe((fkr_detail: fkr_detail) => {
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

  viewspec(){

  }

  add_dopl(){

  }

  deleted_tbl(index:number){

  }

  deleted_dopl(index:number){

  }


  viewOrg(){

  }

  selectOrg(){

  }


  toLocaleDate(dateForStr: string) {
    return new Date(dateForStr).toLocaleDateString() + ' ' + new Date(dateForStr).toLocaleTimeString();
  }





}
