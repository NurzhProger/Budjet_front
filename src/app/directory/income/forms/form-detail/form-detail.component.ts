import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { form_list, form_list_doc,form_detail,forms_tab1 } from "../forms_interfaces";
import { formsService } from '../forms_servise'
import { Observable } from 'rxjs';
import { SpecificationIncomeDetailComponent } from '../../specification-income/specification-income-detail/specification-income-detail.component'
import { specification_income_detail } from '../../specification-income/interfaces'
import { SpecificationIncomeSelectComponent } from '../../specification-income/specification-income-select/specification-income-select.component'
@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css']
})
export class FormDetailComponent implements OnInit {

  constructor(
    private form_detail_ryref: DynamicDialogRef,
    private form_list_messageServicedelSelect: MessageService,
    private form_detail_dialog: DialogService,
    private form_Servise:formsService)  { }




  @Input() form_doc_id = ''
  @Output() closeEvent = new EventEmitter<any>();
  items: MenuItem[];
  form: FormGroup





  form_detail: form_detail = {
    form: {
      id: 0,
      name: "",
      head_form: "",
      num_app: 0,
      spec_code: "",
      spec_name: "",
      _spec: 0
    },
    tbl: [{
      id: 0,
      name: "",
      column: 0,
      columns_used: "",
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
      zn_ed_izm: null
    }],
    dopl: {
      id: 0,
      column: 0,
      columns_used: "",
      summ: 0,
      _form: 0,
      doplata: 0,
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null, [Validators.required]),
      name_doc: new FormControl(null, [Validators.required]),
      spec_name: new FormControl(null, [Validators.required]),
      // budjet_name: new FormControl(null, [Validators.required])
    })
    let res:any
    console.log("Nen");
    if (this.form_doc_id !== '') {
      console.log(this.form_doc_id)
      this.form_Servise.fetch_detail(this.form_doc_id)
        .subscribe(
          (detail) => {
            this.form_detail = detail,
            console.log(this.form_detail)
          }
        )
    }
    else {
      this.form_detail = {
        form: {
          id: 0,
          name: "",
          head_form: "",
          num_app: 0,
          spec_code: "",
          spec_name: "",
          _spec: 0
        },
        tbl: [{
          id: 0,
          name: "",
          column: 0,
          columns_used: "",
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
          zn_ed_izm: null
        }],
        dopl: {
          id: 0,
          column: 0,
          columns_used: "",
          summ: 0,
          _form: 0,
          doplata: 0,
        }
      }


    }

  }

  saveDoc(close: boolean){

  }


  closeform(close: boolean){

  }

  addClassification(){

  }

  calculate(){

  }

  changedate(){

  }

  viewspec(){

    this.form_detail_ryref = this.form_detail_dialog.open(SpecificationIncomeDetailComponent,
      {
        header: 'Редактирование специфики',
        width: '60%',
        height: '80%',
        data: { spec_inc: this.form_detail.form._spec}
      })

    this.form_detail_ryref.onClose.subscribe((spec: specification_income_detail) => {
      if (spec) {
        this.form_detail.form._spec = spec.id,
        this.form_detail.form.spec_code = spec.code,
        this.form_detail.form.spec_name = spec.name_rus
      }
    })

  }

  selectspec(){

    this.form_detail_ryref = this.form_detail_dialog.open(SpecificationIncomeSelectComponent,
      {
        header: 'Выбор специфики',
        width: '60%',
        height: '80%'
      })

    this.form_detail_ryref.onClose.subscribe((spec: specification_income_detail) => {
      if (spec) {
        this.form_detail.form._spec = spec.id,
        this.form_detail.form.spec_code = spec.code,
        this.form_detail.form.spec_name = spec.name_rus
      }
    })

  }
}
