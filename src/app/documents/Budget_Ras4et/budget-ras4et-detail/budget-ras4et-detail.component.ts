import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, throwError, timeout } from 'rxjs'
import { EnstruListComponent } from 'src/app/directory/planirovanie/ensTRU/enstru-list/enstru-list.component';
import { ensTRU_element } from 'src/app/directory/planirovanie/ensTRU/interfaces';
import { stazh_category_element } from 'src/app/directory/planirovanie/stazh-category/interfaces';
import { category_sotr_element } from 'src/app/directory/planirovanie/category-sotr/interfaces';
import { dolzhnost_element } from 'src/app/directory/planirovanie/dolzhnost/interfaces';
import { podrazdelenie_element } from 'src/app/directory/podrazdelenie/interfaces';
import { DoplNadbavkaElementComponent } from 'src/app/directory/planirovanie/dopl_nadbavka/dopl-nadbavka-element/dopl-nadbavka-element.component';
import { OblastiRegionyElementComponent } from 'src/app/directory/planirovanie/oblasti-regiony/oblasti-regiony-element/oblasti-regiony-element.component';
import { marki_avto_element } from 'src/app/directory/planirovanie/marki_avto/interfaces';
import { ed_izm_element } from 'src/app/directory/planirovanie/ed-izm/interfaces';
import { Ras4et_doc, ChildItem, TableItemPass } from "../Budget_ras4et.interfaces";
import { budjetRas4et_Service } from "../Budget_ras4et.Services";
import { SHA256 } from 'crypto-js';
import { EdIzmListComponent } from 'src/app/directory/planirovanie/ed-izm/ed-izm-list/ed-izm-list.component';
import { CategorySotrListComponent } from 'src/app/directory/planirovanie/category-sotr/category-sotr-list/category-sotr-list.component';
import { DolznostListComponent } from 'src/app/directory/planirovanie/dolzhnost/dolznost-list/dolznost-list.component';
import { PodrazdelenieListComponent } from 'src/app/directory/podrazdelenie/podrazdelenie-list/podrazdelenie-list.component';
import { doplaty_nadbavky_element } from 'src/app/directory/planirovanie/dopl_nadbavka/interfaces';
import { DoplNadbavkaListComponent } from 'src/app/directory/planirovanie/dopl_nadbavka/dopl-nadbavka-list/dopl-nadbavka-list.component';
import { oblasti_element } from 'src/app/directory/planirovanie/oblasti-regiony/interfaces';
import { OblastiRegionyListComponent } from 'src/app/directory/planirovanie/oblasti-regiony/oblasti-regiony-list/oblasti-regiony-list.component';
import { MarkiAvtoListComponent } from 'src/app/directory/planirovanie/marki_avto/marki-avto-list/marki-avto-list.component';
import { StazhCategoryListComponent } from 'src/app/directory/planirovanie/stazh-category/stazh-category-list/stazh-category-list.component';
import * as math from 'mathjs';

@Component({
  selector: 'app-budget-ras4et-detail',
  templateUrl: './budget-ras4et-detail.component.html',
  styleUrls: ['./budget-ras4et-detail.component.css']
})
export class BudgetRas4etDetailComponent implements OnInit {

  constructor(
    private Budget_ras4et_Service: budjetRas4et_Service,
    private Budget_ras4et_Detailconfig: DynamicDialogConfig,
    private Budget_ras4et_Detailmsg: MessageService,
    private Budget_ras4et_Detailref: DynamicDialogRef,
    private Budget_ras4et_DialogService: DialogService,
    private Budget_Confirmation: ConfirmationService) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() ras_id: any
  @Input() form_id = ''
  form: FormGroup
  items: MenuItem[];
  Ras4et_detail: Ras4et_doc
  children: any = []
  column: any = []
  hashBegin = ''
  hashEnd = ''
  spec_fullname = ''
  form_fullname = '' 
  summdoc = 0
  ngOnInit(): void {
    this.form = new FormGroup({
      name_doc: new FormControl(null, [Validators.required]),
      spec_name: new FormControl(null, [Validators.required])
    })

    // this.formaid = this.Budget_ras4et_Detailconfig.data.formaid
    // console.log(this.ras_id);
    // console.log(this.form_id);
    
    if (this.ras_id !== "") {
      let params = {
        form: this.ras_id.form_id
      }
      
      
      this.Budget_ras4et_Service.fetch_detail(this.ras_id.ras_id, params)
        .subscribe(
          (data) => (
            this.Ras4et_detail = data,
            // this.form_fullname = this.Ras4et_detail.head._form.name + ". " + this.Ras4et_detail.head._form.head_form,
            // this.spec_fullname = this.Ras4et_detail.head._spec.code + ". " + this.Ras4et_detail.head._spec.name_rus,
            this.preob()
          )
        )
    }
  }

  preob() {
    
    if (this.ras_id.ras_id == 0){
      for (let i = 0; this.Ras4et_detail.tbl.length > i; i++) {
        // for (let x = 0; this.Ras4et_detail.tbl[i].length > x; x++) {
        //   this.column.push(this.Ras4et_detail.tbl[i].children[x])
        // }
        this.column.push(this.Ras4et_detail.tbl[i].zn)
      }
      this.Ras4et_detail.tbl.splice(0, this.Ras4et_detail.tbl.length)
    }
    else
    {
      for (let i = 0; this.Ras4et_detail.tbl.length > i; i++) {
        // for (let x = 0; this.Ras4et_detail.tbl[i].length > x; x++) {
        //   this.column.push(this.Ras4et_detail.tbl[i].children[x])
        // }
        this.children.push(this.Ras4et_detail.tbl[i])
        
      }
    }
    // this.column.push(this.Ras4et_detail.tbl[0])

  }

  add_tbl() { 
    for (let i = 0; i < this.column.length; i++) {
      console.log(this.column[i]);
  }}

  selectENSTRU(ensTRU: ensTRU_element) {
    
    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(EnstruListComponent,
      {
        header: 'Выбор ЕНСТРУ',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((ensTRU_element: ensTRU_element) => {
      if (ensTRU_element) {
        ensTRU.name_rus = ensTRU_element.name_rus
        ensTRU.id = ensTRU_element.id
      }
    })
  }

  selectEd_Izm(ed_izm: ed_izm_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(EdIzmListComponent,
      {
        header: 'Выбор единицы измерения',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((ed_izm_element: ed_izm_element) => {
      if (ed_izm_element) {
        ed_izm.name = ed_izm_element.name
        ed_izm.id = ed_izm_element.id
      }
    })
  }

  selectCategorySotr(cat_sotr: category_sotr_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(CategorySotrListComponent,
      {
        header: 'Выбор категории',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((category_sotr_element: category_sotr_element) => {
      if (category_sotr_element) {
        cat_sotr = category_sotr_element
      }
    })
  }

  selectDolzhnost(dolzh_el: dolzhnost_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(DolznostListComponent,
      {
        header: 'Выбор должности',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((dolzhnost_element: dolzhnost_element) => {
      if (dolzhnost_element) {
        dolzh_el = dolzhnost_element
      }
    })
  }

  selectPodrazdelenie(podr_el: podrazdelenie_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(PodrazdelenieListComponent,
      {
        header: 'Выбор подразделении',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((podrazdelenie_element: podrazdelenie_element) => {
      if (podrazdelenie_element) {
        podr_el = podrazdelenie_element
      }
    })
  }

  selectDoplNadb(dopl_nad: doplaty_nadbavky_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(DoplNadbavkaListComponent,
      {
        header: 'Выбор доплаты и надбавки',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((doplaty_nadbavky_element: doplaty_nadbavky_element) => {
      if (doplaty_nadbavky_element) {
        dopl_nad = doplaty_nadbavky_element
      }
    })
  }

  selectOblreg(obl_reg: oblasti_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(OblastiRegionyListComponent,
      {
        header: 'Выбор области регионов',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((oblasti_element: oblasti_element) => {
      if (oblasti_element) {
        obl_reg = oblasti_element
      }
    })
  }

  selectMarkiAvto(marki: marki_avto_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(MarkiAvtoListComponent,
      {
        header: 'Выбор автомобиля',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((marki_avto_element: marki_avto_element) => {
      if (marki_avto_element) {
        marki = marki_avto_element
      }
    })
  }

  selectStazh(stazh_cat: stazh_category_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(StazhCategoryListComponent,
      {
        header: 'Выбор стажа',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((stazh_category_element: stazh_category_element) => {
      if (stazh_category_element) {
        stazh_cat = stazh_category_element
      }
    })
  }

  onInputChange(value: number, kolon: ChildItem, ri: number) {
    let mass: any;
    if (value == undefined) {
      kolon.zn_float = 0;
    } else {
      kolon.zn_float = value;
    }
    
    mass = [this.Ras4et_detail.tbl[ri]];
    
    let mass_arr = mass[0];
    let aaa = '1234567890';
    // this.Ras4et_detail.tbl[ri].
    for (let i = 0; i < mass[0].length; i++) {
      if (mass_arr[i].columns_used !== '') {
        let formula = '';
        let mass_simv = mass_arr[i].columns_used.split(' ');
        for (let y = 0; y < mass_simv.length; y++) {
          if (aaa.includes(mass_simv[y])) {
            formula = formula + mass_arr[mass_simv[y]-1].zn_float;
          } 
          else { 
            formula = formula + mass_simv[y];
          }
        }
        // console.log(formula);
        mass_arr[i].zn_float = math.evaluate(formula);
      }
    }
    this.calculate();
  }

  calculate() {
    let summdoc = 0;
    let mass : any = []

    for (let i = 0; i < this.Ras4et_detail.tbl.length; i++) {
      mass = [this.Ras4et_detail.tbl[i]];
      let mass_arr = mass[0];
      for (let y = 0; y < mass[0].length; y++) {
        if (mass_arr[y].itog) {
          summdoc = summdoc + mass_arr[y].zn_float;
        }
      }
    }
    this.summdoc = summdoc;
    this.Ras4et_detail.head.summ = this.summdoc;
    
  }

  dobavlenya(tip: string, doc: number) {


  }

  saveDoc(close: boolean): void {
    let responce: any
    this.Budget_ras4et_Service.saveLimit(this.Ras4et_detail)
      .subscribe(
        (data) => (
          this.Budget_ras4et_Detailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          responce = data, this.Ras4et_detail = responce,
           this.closeaftersave(close)
        ),
        (error) => (
          this.Budget_ras4et_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.Ras4et_detail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
  }

  closeform(close: boolean) {
    let objString = JSON.stringify(this.Ras4et_detail)
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
  viewsfkr() {

  }

  selectfkr() {

  }

 

}
