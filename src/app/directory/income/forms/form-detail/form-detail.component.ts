import { Component, DoCheck, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { form_list, form_list_doc, form_detail, forms_tab1 } from "../forms_interfaces";
import { formsService } from '../forms_servise'
import { Observable } from 'rxjs';
import { SpecificationIncomeDetailComponent } from '../../specification-income/specification-income-detail/specification-income-detail.component'
import { specification_income_detail } from '../../specification-income/interfaces'
import { SpecificationIncomeSelectComponent } from '../../specification-income/specification-income-select/specification-income-select.component'
import { SHA256 } from 'crypto-js';
import { DoplNadbavkaListComponent } from '../../../planirovanie/dopl_nadbavka/dopl-nadbavka-list/dopl-nadbavka-list.component'
import { doplaty_nadbavky_element } from '../../../planirovanie/dopl_nadbavka/interfaces'
import { Sposob_ras4eta } from '../../../planirovanie/pere4islenya.interfaces'
import { EnstruListComponent } from '../../../planirovanie/ensTRU/enstru-list/enstru-list.component'
import { ensTRU_element } from '../../../planirovanie/ensTRU/interfaces'
import { Sposob_ras4eta_list } from '../../../../enums/tip-sposob-ras4eta/sposob_raslist.interfaces'
import { Sposob_ras4eta_servise } from '../../../../enums/tip-sposob-ras4eta/sposob_raslist.servise'
import { specification_expenses_detail } from 'src/app/directory/expenses/specification-exp/interfaces';
import { SpecificationExpSelectComponent } from 'src/app/directory/expenses/specification-exp/specification-exp-select/specification-exp-select.component';
import { SpecificationExpDetailComponent } from 'src/app/directory/expenses/specification-exp/specification-exp-detail/specification-exp-detail.component';
@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css']
})
export class FormDetailComponent implements OnInit {

  constructor(
    private form_detail_ryref: DynamicDialogRef,
    private form_detail_messageServicedelSelect: MessageService,
    private form_detail_dialog: DialogService,
    private form_Servise: formsService,
    private sposob_servise: Sposob_ras4eta_servise,
    private form_Confirmation: ConfirmationService) { }




  @Input() form_doc_id = ''
  @Output() closeEvent = new EventEmitter<any>();
  items: MenuItem[];
  form: FormGroup
  // clonedProducts: { [s: string]: forms_tab1 } = {};
  hashBegin = ''
  hashEnd = ''
  readerOptions = [{ label: 'Да', value: 'true' }, { label: 'Нет', value: 'false' }]
  statuses!: SelectItem[]
  tip_options: any = []
  windowHeight: number

  form_detail: form_detail = {
    form: {
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
    tbl: [{
      id: 0,
      name: "",
      _column: 0,
      columns_used: "",
      zn: "",
      itog: false,
      total: false,
      zn_string: null,
      zn_float: null,
      zn_enstru: null,
      zn_stazh_category: null,
      zn_category_sotr: null,
      zn_dolzhnost: null,
      zn_podrazdelenie: null,
      zn_dopl_nadb: null,
      zn_oblasti_reg: null,
      zn_marki_avto: null,
      zn_ed_izm: null,
      head: '',
      head_kaz: '',
      head_level: 0,
      name_kaz: '',
      _sposob_ras: '',
      basic_column: false,
      razmer: 0
    }],
    dopl: [{
      id: 0,
      columns_used: "",
      summ: 0,
      _column: 0,
      _form: 0,
      _doplata: 0,
      _doplata_name: '',
      _sposob_ras: "",
    }]
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null, [Validators.required]),
      name_doc: new FormControl(null, [Validators.required]),
      spec_name: new FormControl(null, [Validators.required]),
      nomer_form: new FormControl(null, [Validators.required]),
      // budjet_name: new FormControl(null, [Validators.required])
    })

    this.selectTipTop()

    if (this.form_doc_id !== '') {
      this.form_Servise.fetch_detail(this.form_doc_id)
        .subscribe(
          (detail) => {
            this.form_detail = detail

            let objString = JSON.stringify(this.form_detail)
            this.hashBegin = SHA256(objString).toString()
          }
        )
    }
    else {
      // this.form_detail = {
      //   form: {
      //     id: 0,
      //     name: "",
      //     head_form: "",
      //     num_app: 0,
      //     spec_code: "",
      //     spec_name: "",
      //     _spec: 0
      //   },
      //   tbl: [{
      //     id: 0,
      //     name: "",
      //     column: 0,
      //     columns_used: "",
      //     zn: "",
      //     zn_string: null,
      //     zn_float: null,
      //     zn_enstru: null,
      //     zn_stazh_category: null,
      //     zn_category_sotr: null,
      //     zn_dolzhnost: null,
      //     zn_podrazdelenie: null,
      //     zn_dopl_nadb: null,
      //     zn_oblasti_reg: null,
      //     zn_marki_avto: null,
      //     zn_ed_izm: null
      //   }],
      //   dopl: [{
      //     id: 0,
      //     columns_used: "",
      //     summ: 0,
      //     _form: 0,
      //     _doplata: 0,
      //     _doplata_name: "",
      //     _sposob_ras: "",
      //   }]
      // }


    }

    this.statuses = [
      { label: 'Строка', value: 'string' },
      { label: 'Число', value: 'float' },
      { label: 'Номенклатура', value: 'enstru' },
      { label: 'Стажы', value: 'stazh_category' },
      { label: 'Категории должностей', value: 'category_sotr' },
      { label: 'Должности работников', value: 'dolzhnost' },
      { label: 'Подразделение', value: 'podrazdelenie' },
      { label: 'Виды доплат и надбавок', value: 'dopl_nadb' },
      { label: 'Областии регионы', value: 'oblasti_reg' },
      { label: 'Едница измерений', value: 'ed_izm' },
      { label: 'Марки автомобилей', value: 'marki_avto' }
    ];



    this.updateWindowSize()

  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.85;
  }

  selectTipTop() {
    let responce: any;
    this.sposob_servise.fetch().subscribe(
      (data) => (responce = data, this.tip_options = responce.results
      ),
      (error) => (this.form_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));

  }

  saveDoc(close: boolean) {
    this.form_Servise.saveforms(this.form_detail)
      .subscribe(
        (data) => (this.form_detail_messageServicedelSelect.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          this.closeaftersave(close)
        ),
        (error) => (
          this.form_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )

  }

  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.form_detail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
  }


  closeform(close: boolean) {

    let objString = JSON.stringify(this.form_detail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.form_Confirmation.confirm({
          message: 'Данные были изменены. Закрыть Справочник?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.form_Confirmation.close()
          },
          reject: () => {
            this.form_Confirmation.close()
          }
        })
      }
    }
  }



  add_tbl() {
    this.form_detail.tbl.push(
      {
        id: 0,
        name: "",
        _column: 0,
        columns_used: "",
        itog: false,
        total: false,
        zn: "",
        zn_string: null,
        zn_float: null,
        zn_enstru: null,
        zn_stazh_category: null,
        zn_category_sotr: null,
        zn_dolzhnost: null,
        zn_podrazdelenie: null,
        zn_dopl_nadb: null,
        zn_oblasti_reg: null,
        zn_marki_avto: null,
        zn_ed_izm: null,
        head: '',
        head_kaz: '',
        head_level: 0,
        name_kaz: '',
        _sposob_ras: '',
        basic_column: false,
        razmer: 0
      }

    )

  }

  // onRowEditInit(product: forms_tab1,index: number){
  //   this.clonedProducts[String(product.id) as string] = this.form_detail.tbl[index]
  // }
  // onRowEditSave(product: forms_tab1,index: number){

  // }
  // onRowEditCancel(product: forms_tab1,index: number){
  //   this.form_detail.tbl[index] = this.clonedProducts[String(product.id) as string];
  //   delete this.clonedProducts[String(product.id) as string];
  // }

  add_dopl() {
    this.form_detail.dopl.push(
      {
        id: 0,
        columns_used: "",
        summ: 0,
        _form: 0,
        _column: 0,
        _doplata: 0,
        _doplata_name: "",
        _sposob_ras: "",
      }

    )

  }



  viewspec() {

    this.form_detail_ryref = this.form_detail_dialog.open(SpecificationExpDetailComponent,
      {
        header: 'Редактирование специфики',
        width: '60%',
        height: '80%',
        data: { spec_inc: this.form_detail.form._spec }
      })

    this.form_detail_ryref.onClose.subscribe((spec: specification_expenses_detail) => {
      if (spec) {
        this.form_detail.form._spec.id = spec.id,
          this.form_detail.form._spec.code = spec.code,
          this.form_detail.form._spec.name_rus = spec.name_rus
      }
    })

  }

  selectspec() {

    this.form_detail_ryref = this.form_detail_dialog.open(SpecificationExpSelectComponent,
      {
        header: 'Выбор специфики',
        width: '60%',
        height: '80%'
      })

    this.form_detail_ryref.onClose.subscribe((spec: specification_expenses_detail) => {
      if (spec) {
        this.form_detail.form._spec.id = spec.id,
          this.form_detail.form._spec.code = spec.code,
          this.form_detail.form._spec.name_rus = spec.name_rus
      }
    })

  }


  selectDoplata(index: number) {
    this.form_detail_ryref = this.form_detail_dialog.open(DoplNadbavkaListComponent,
      {
        header: 'Выбор доплаты',
        width: '60%',
        height: '80%'
      })

    this.form_detail_ryref.onClose.subscribe((spec: doplaty_nadbavky_element) => {
      if (spec) {
        this.form_detail.dopl[index]._doplata = spec.id
        this.form_detail.dopl[index]._doplata_name = spec.name_rus
        // this.form_detail.form.spec_name = spec.name_rus
      }
    })


  }



  deleted_tbl(index: number) {
    this.form_detail.tbl.splice(index, 1)
  }

  deleted_dopl(index: number) {
    this.form_detail.dopl.splice(index, 1)
  }
}
