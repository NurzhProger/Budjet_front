import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, catchError, throwError, timeout } from 'rxjs'
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
import { Ras4et_doc, ChildItem, TableItemPass, Ras4et_new_dopl, Ras4et_dopl } from "../Budget_ras4et.interfaces";
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
import { Ras4etPrintFormComponent } from '../ras4et-print-form/ras4et-print-form/ras4et-print-form.component';
import { SelectDoplataComponent } from '../select-doplata/select-doplata.component';
import { EnstruSelectComponent } from 'src/app/directory/planirovanie/ensTRU/enstru-select/enstru-select.component';
import { StazhCategorySelectComponent } from 'src/app/directory/planirovanie/stazh-category/stazh-category-select/stazh-category-select.component';
import { CategorySotrSelectComponent } from 'src/app/directory/planirovanie/category-sotr/category-sotr-select/category-sotr-select.component';
import { DolznostSelectComponent } from 'src/app/directory/planirovanie/dolzhnost/dolzhnost-select/dolzhnost-select.component';
import { PodrazdelenieSelectComponent } from 'src/app/directory/podrazdelenie/podrazdelenie-select/podrazdelenie-select.component';
import { OblastiRegionySelectComponent } from 'src/app/directory/planirovanie/oblasti-regiony/oblasti-regiony-select/oblasti-regiony-select.component';
import { EdIzmSelectComponent } from 'src/app/directory/planirovanie/ed-izm/ed-izm-select/ed-izm-select.component';
import { MarkiAvtoSelectComponent } from 'src/app/directory/planirovanie/marki_avto/marki-avto-select/marki-avto-select.component';
import { DoplNadbavkaSelectComponent } from 'src/app/directory/planirovanie/dopl_nadbavka/dopl-nadbavka-select/dopl-nadbavka-select.component';
import { string } from 'mathjs';

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
    private Budget_Confirmation: ConfirmationService,
    private Budget_ras4et_DetailrefModal: DynamicDialogRef) { }

  @Output() closeEvent = new EventEmitter<any>()
  // @Input() izm: any
  // @Input() form_id = ''
  izm: any
  tbl: ChildItem
  new_dopl: [Ras4et_new_dopl]
  form: FormGroup
  items: MenuItem[]
  Ras4et_detail: Ras4et_doc
  dopl: [Ras4et_dopl]
  children: any = []
  copy_str: any = []
  column: any
  hashBegin = ''
  hashEnd = ''
  spec_fullname = ''
  form_fullname = ''
  summdoc = 0
  have_dopl = false
  period = ''


  ngOnInit(): void {
    this.form = new FormGroup({
      name_doc: new FormControl(null, [Validators.required]),
      spec_name: new FormControl(null, [Validators.required])
    })

    this.izm = this.Budget_ras4et_Detailconfig.data.data
    this.period = this.Budget_ras4et_Detailconfig.data.period

    if (this.izm) {

      this.Budget_ras4et_Service.fetch_detail(this.izm)
        .subscribe(
          (data) => (
            this.Ras4et_detail = data,
            this.preob()
          )
        )
    }

  }

  preob() {

    this.column = this.Ras4et_detail.tbl[0]

    if (this.Ras4et_detail.new_dopl.length > 0) {
      this.have_dopl = true
    }
    if (this.izm.id == 0) {
      this.Ras4et_detail.tbl.splice(0, this.Ras4et_detail.tbl.length)
    }
    else {
      for (let i = 0; this.Ras4et_detail.tbl.length > i; i++) {
        this.children.push(this.Ras4et_detail.tbl[i])
      }
    }
  }

  selectDopl(ri: number) {

    let add_dopl: any = []
    let _dopl: any = []
    let new_dopl: any = []
    let wws: any = []
    let mal: any = []
    let tbl: any = []
    let stroka: number = 0
    let ind_dopl: number
    let naiden: boolean = false
    wws = this.children[ri]

    for (let i = 0; wws.length > i; i++) {
      stroka = wws[i].stroka
    }

    for (let y = 0; this.Ras4et_detail.dopl.length > y; y++) {
      if (naiden == false) {
        mal = this.Ras4et_detail.dopl[y]

        if (stroka == mal[0].stroka) {
          naiden = true
        }
      }
      if (naiden == true) {
        add_dopl = this.Ras4et_detail.dopl[y]
        ind_dopl = y
        break
      }
    }

    if (add_dopl !== undefined) {
      if (add_dopl.length > 0) {
        for (let i = 0; add_dopl.length > i; i++) {
          _dopl.push(add_dopl[i]._doplata)
        }
      }
    }

    for (let i = 0; this.Ras4et_detail.new_dopl.length > i; i++) {
      let newDoplItem = this.Ras4et_detail.new_dopl[i];
      let found = _dopl.find((item: number) => item === newDoplItem._doplata);
      if (!found) {
        new_dopl.push(newDoplItem);
      }
    }
    tbl = this.Ras4et_detail.tbl[stroka - 1]

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(SelectDoplataComponent,
      {
        header: 'Выбор доплат и надбавок',
        width: 'calc(60%)',
        height: 'calc(80%)',
        data: {
          period: this.period,
          first_dopl: this.Ras4et_detail.new_dopl,
          new_dopl: new_dopl,
          added_dopl: add_dopl,
          tbl: tbl
        }
      }
    )

    this.Budget_ras4et_Detailref.onClose.subscribe((dopl: any) => {
      if (dopl) {

        let fff: any = []
        fff = JSON.parse(JSON.stringify(dopl))
        for (let ss = 0; fff.length > ss; ss++) {
          fff[ss].stroka = stroka
        }

        if (ind_dopl !== undefined) {
          this.Ras4et_detail.dopl.splice(ind_dopl, 1)
        }

        if (fff.length !== 0) {
          this.Ras4et_detail.dopl.push(fff);
        }


        let column = dopl[0]._column
        let summ_mass = 0

        for (let i = 0; dopl.length > i; i++) {
          summ_mass = summ_mass + dopl[i].summ
        }

        wws[column - 1].zn_float = summ_mass
      }
    })
  }


  add_tbl() {
    let newnew: any = []
    this.copy_str = JSON.parse(JSON.stringify(this.Ras4et_detail.new_str));
    newnew = this.copy_str[0]
    let asd: any = []
    asd = newnew
    for (let i = 0; newnew.length > i; i++) {
      asd[i].stroka = this.children.length + 1
    }
    this.children.push(asd)
  }

  delStr(ind: number) {

    let add_dopl: any = []
    this.Budget_Confirmation.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.children.splice(ind, 1)
        add_dopl = this.Ras4et_detail.dopl.splice(ind, 1)
        this.Budget_Confirmation.close()
      },
      reject: () => {
        this.Budget_Confirmation.close();
      }
    });
  }

  selectENSTRU(ensTRU: ensTRU_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(EnstruSelectComponent,
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

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(EdIzmSelectComponent,
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

  selectCategorySotr(cat_sotr: category_sotr_element, ri: number) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(CategorySotrSelectComponent,
      {
        header: 'Выбор категории',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })

    this.Budget_ras4et_Detailref.onClose.subscribe((category_sotr_element: category_sotr_element) => {
      if (category_sotr_element) {
        cat_sotr.id = category_sotr_element.id
        cat_sotr.name = category_sotr_element.name
        this.getKoefficient(ri)
      }
    })

  }

  getKoefficient(ri: number) {
    let _category_id = 0
    let _stazh_id = 0
    for (let i = 0; i < this.children[ri].length; i++) {
      if (this.children[ri][i].zn == 'category_sotr') {
        _category_id = this.children[ri][i].zn_category_sotr.id
      }

      if (this.children[ri][i].zn == 'stazh_category') {
        _stazh_id = this.children[ri][i].zn_stazh_category.id
      }
    }

    if (_category_id !== 0 && _stazh_id !== 0) {

      let body = {
        _category_id: _category_id,
        _stazh_id: _stazh_id
      }

      let responce: any

      this.Budget_ras4et_Service
        .getKoeff(body)
        .subscribe(
          (data) => (
            responce = data,
            this.PasteKoeff(ri, parseFloat(responce.znachenie))
          ),
          (error) => (this.Budget_ras4et_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
        )
    }
  }

  PasteKoeff(ri: number, znachenie: number) {
    for (let i = 0; i < this.children[ri].length; i++) {
      if (this.children[ri][i].zn == 'float' && this.children[ri][i].name == 'Коэффициент') {
        this.children[ri][i].zn_float = znachenie
      }
    }
  }

  selectDolzhnost(dolzh_el: dolzhnost_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(DolznostSelectComponent,
      {
        header: 'Выбор должности',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((dolzhnost_element: dolzhnost_element) => {
      if (dolzhnost_element) {
        dolzh_el.id = dolzhnost_element.id
        dolzh_el.name_rus = dolzhnost_element.name_rus

      }
    })
  }

  selectPodrazdelenie(podr_el: podrazdelenie_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(PodrazdelenieSelectComponent,
      {
        header: 'Выбор подразделении',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((podrazdelenie_element: podrazdelenie_element) => {
      if (podrazdelenie_element) {
        podr_el.id = podrazdelenie_element.id
        podr_el.name_rus = podrazdelenie_element.name_rus
      }
    })
  }

  selectDoplNadb(dopl_nad: doplaty_nadbavky_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(DoplNadbavkaSelectComponent,
      {
        header: 'Выбор доплаты и надбавки',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((doplaty_nadbavky_element: doplaty_nadbavky_element) => {
      if (doplaty_nadbavky_element) {

        dopl_nad.id = doplaty_nadbavky_element.id
        dopl_nad.name_rus = doplaty_nadbavky_element.name_rus
      }
    })
  }

  selectOblreg(obl_reg: oblasti_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(OblastiRegionySelectComponent,
      {
        header: 'Выбор области регионов',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((oblasti_element: oblasti_element) => {
      if (oblasti_element) {
        obl_reg.id = oblasti_element.id
        obl_reg.name = oblasti_element.name
      }
    })
  }

  selectMarkiAvto(marki: marki_avto_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(MarkiAvtoSelectComponent,
      {
        header: 'Выбор автомобиля',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((marki_avto_element: marki_avto_element) => {
      if (marki_avto_element) {
        marki.id = marki_avto_element.id
        marki.name = marki_avto_element.name
      }
    })
  }

  selectStazh(stazh_cat: stazh_category_element, ri: number) {
    let _category_id = 0
    for (let i = 0; i < this.children[ri].length; i++) {
      if (this.children[ri][i].zn == 'category_sotr') {
        _category_id = this.children[ri][i].zn_category_sotr.id
      }
    }

    // if (this.Ras4et_detail.tbl[ri].zn_category_sotr.id !== 0) {
    //   this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(StazhCategorySelectComponent,
    //     {
    //       header: 'Выбор стажа',
    //       width: 'calc(60%)',
    //       height: 'calc(80%)',
    //       data: { category_id: this.Ras4et_detail.tbl[ri].zn_category_sotr.id }
    //     })

    //   this.Budget_ras4et_Detailref.onClose.subscribe((stazh_category_element: stazh_category_element) => {
    //     if (stazh_category_element) {
    //       stazh_cat.name = stazh_category_element.name
    //       stazh_cat.id = stazh_category_element.id
    //       this.getKoefficient(ri)
    //     }
    //   })
    // } else {
    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(StazhCategorySelectComponent,
      {
        header: 'Выбор стажа',
        width: 'calc(60%)',
        height: 'calc(80%)',
        data: { category_id: _category_id }
      })

    this.Budget_ras4et_Detailref.onClose.subscribe((stazh_category_element: stazh_category_element) => {
      if (stazh_category_element) {
        stazh_cat.name = stazh_category_element.name
        stazh_cat.id = stazh_category_element.id
        this.getKoefficient(ri)
      }
    })
    // }




  }

  formatNumber(value: number): string {
    return value.toString()
  }

  onInputChange(value: number, kolon: ChildItem, ri: number) {
    let mass: any;
    if (value == undefined) {
      kolon.zn_float = 0;
    } else {
      kolon.zn_float = value;
    }

    mass = [this.children[ri]];

    let mass_arr = mass[0];
    let aaa = '1234567890';
    let koeffBolshe100 = false

    for (let i = 0; i < mass[0].length; i++) {
      if (mass_arr[i].name == 'Коэффициент') {
        if (mass_arr[i].zn_float > 99) {
          koeffBolshe100 = true
        }
      }
    }
    // this.Ras4et_detail.tbl[ri].
    for (let i = 0; i < mass[0].length; i++) {
      if (mass_arr[i].columns_used !== '') {
        let formula = '';
        let mass_simv = mass_arr[i].columns_used.split(' ');
        for (let y = 0; y < mass_simv.length; y++) {
          if (aaa.includes(mass_simv[y])) {
            formula = formula + mass_arr[mass_simv[y] - 1].zn_float;
          }
          else if (mass_simv[y] > mass_arr.length) {
            formula = formula + mass_simv[y];
          }
          else if (aaa.includes(mass_simv[y][1])) {
            formula = formula + mass_arr[mass_simv[y] - 1].zn_float;
          }
          else if (mass_simv[y] == "БДО") {
            if (koeffBolshe100 == false) {
              formula = formula + 17697
            } else {
              formula = formula + 1
            }
          }
          else {
            formula = formula + mass_simv[y];
          }
        }
        mass_arr[i].zn_float = math.evaluate(formula);
      }
    }
    this.calculate();
  }

  onInputChangeString(value: string, kolon: ChildItem, ri: number) {
    // let mass: any;

    kolon.zn_string = value;

    // mass = [this.children[ri]];

    // let mass_arr = mass[0];
    // let aaa = '1234567890';
    // // this.Ras4et_detail.tbl[ri].
    // for (let i = 0; i < mass[0].length; i++) {
    //   if (mass_arr[i].columns_used !== '') {
    //     let formula = '';
    //     let mass_simv = mass_arr[i].columns_used.split(' ');
    //     for (let y = 0; y < mass_simv.length; y++) {
    //       if (aaa.includes(mass_simv[y])) {
    //         formula = formula + mass_arr[mass_simv[y] - 1].zn_float;
    //       }
    //       else {
    //         formula = formula + mass_simv[y];
    //       }
    //     }
    //     mass_arr[i].zn_float = math.evaluate(formula);
    //   }
    // }
    // this.calculate();
  }

  calculate() {
    let summdoc = 0;
    let mass: any = []

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
    this.Ras4et_detail.tbl = this.children
    this.Budget_ras4et_Service
      .saveLimit(this.Ras4et_detail)
      .subscribe(
        (data) => (
          responce = data,
          this.Ras4et_detail.head = responce,
          this.Budget_ras4et_Detailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          this.calculate(),
          // this.Ras4et_detail.head.id = responce.head.id,
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
      this.Budget_ras4et_DetailrefModal.close(this.Ras4et_detail)
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

  toPrint() {
    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(Ras4etPrintFormComponent, {
      header: 'Печатная форма',
      width: '95%',
      height: '95%',
      data: {
        'doc': {
          'id': this.Ras4et_detail.head.id
        },
      },
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }



}
