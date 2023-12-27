import { Component, OnInit } from '@angular/core';
import { Ras4et_new_dopl } from '../Budget_ras4et.interfaces';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { budjetRas4et_Service } from '../Budget_ras4et.Services'
import { MessageService } from 'primeng/api';
import * as math from 'mathjs';
import { ensTRU_element } from 'src/app/directory/planirovanie/ensTRU/interfaces';
import { EnstruSelectComponent } from 'src/app/directory/planirovanie/ensTRU/enstru-select/enstru-select.component';
import { category_sotr_element } from 'src/app/directory/planirovanie/category-sotr/interfaces';
import { CategorySotrSelectComponent } from 'src/app/directory/planirovanie/category-sotr/category-sotr-select/category-sotr-select.component';
import { dolzhnost_element } from 'src/app/directory/planirovanie/dolzhnost/interfaces';
import { DolznostSelectComponent } from 'src/app/directory/planirovanie/dolzhnost/dolzhnost-select/dolzhnost-select.component';
import { ed_izm_element } from 'src/app/directory/planirovanie/ed-izm/interfaces';
import { EdIzmSelectComponent } from 'src/app/directory/planirovanie/ed-izm/ed-izm-select/ed-izm-select.component';
import { podrazdelenie_element } from 'src/app/directory/podrazdelenie/interfaces';
import { PodrazdelenieSelectComponent } from 'src/app/directory/podrazdelenie/podrazdelenie-select/podrazdelenie-select.component';
import { doplaty_nadbavky_element } from 'src/app/directory/planirovanie/dopl_nadbavka/interfaces';
import { DoplNadbavkaSelectComponent } from 'src/app/directory/planirovanie/dopl_nadbavka/dopl-nadbavka-select/dopl-nadbavka-select.component';
import { oblasti_element } from 'src/app/directory/planirovanie/oblasti-regiony/interfaces';
import { OblastiRegionySelectComponent } from 'src/app/directory/planirovanie/oblasti-regiony/oblasti-regiony-select/oblasti-regiony-select.component';
import { marki_avto_element } from 'src/app/directory/planirovanie/marki_avto/interfaces';
import { MarkiAvtoSelectComponent } from 'src/app/directory/planirovanie/marki_avto/marki-avto-select/marki-avto-select.component';
import { stazh_category_element } from 'src/app/directory/planirovanie/stazh-category/interfaces';
import { StazhCategorySelectComponent } from 'src/app/directory/planirovanie/stazh-category/stazh-category-select/stazh-category-select.component';
import { OtborENSSelectComponent } from 'src/app/directory/planirovanie/otborEnsTRU/otborENS_select/otbor-ens-select/otbor-ens-select.component';
import { otbor_ensTRU_element } from 'src/app/directory/planirovanie/otborEnsTRU/interfaces';

@Component({
  selector: 'app-select-ras4et',
  templateUrl: './select-ras4et.component.html',
  styleUrls: ['./select-ras4et.component.css']
})
export class SelectRas4etComponent implements OnInit {

  new_dopl: [Ras4et_new_dopl]
  first_dopl: [Ras4et_new_dopl]
  fff: any = []
  added_dopl: any = []
  tbl: any = []
  head_table: any = []
  head: any = []
  copytbl: any = []
  stroka: number
  new_ras: any = []
  period = ''
  rezult = 0
  summdoc = 0
  MRP: number
  BDO: number

  constructor(
    private select_budjetRas4et_Service: budjetRas4et_Service,
    private select_dialog_config: DynamicDialogConfig,
    private select_dialog_msg: MessageService,
    private select_dialog_Detailref: DynamicDialogRef,
    private select_dialog_service: DialogService,
    private select_dialog_Detailref_ens: DynamicDialogRef,
    private select_dialog_service_ens: DialogService,
    private select_dialog_Detailref_ed_izm: DynamicDialogRef,
    private select_dialog_service_ed_izm: DialogService,
    private select_dialog_Detailref_podr: DynamicDialogRef,
    private select_dialog_service_podr: DialogService,
    private select_dialog_service_stazh: DialogService,
    private select_dialog_Detailref_stazh: DynamicDialogRef,
    private select_dialog_service_category: DialogService,
    private select_dialog_Detailref_category: DynamicDialogRef,
    private select_dialog_service_dolzhnost: DialogService,
    private select_dialog_Detailref_dolzhnost: DynamicDialogRef,
    private select_dialog_service_marki: DialogService,
    private select_dialog_Detailref_marki: DynamicDialogRef,
    private select_dialog_Detailref_obl: DynamicDialogRef,
    private select_dialog_service_obl: DialogService,
    private select_dialog_Detailref_dopl: DynamicDialogRef,
    private select_dialog_service_dopl: DialogService,
  ) { }

  ngOnInit(): void {
    // this.tbl = JSON.parse(this.select_dialog_config.data.tbl)
    this.copytbl = this.select_dialog_config.data.tbl
    this.tbl = JSON.parse(JSON.stringify(this.select_dialog_config.data.tbl))
    this.head_table = this.select_dialog_config.data.head_table
    this.head = this.select_dialog_config.data.head
    this.new_ras = this.select_dialog_config.data.new_ras
    this.stroka = this.select_dialog_config.data.stroka
    this.period = this.select_dialog_config.data.period
    this.getMRP()
    this.getBDO()
    this.add_head()
  }

  add_head() {
    for (let i = 0; i < this.tbl.length; i++) {
      this.tbl[i]['head_table'] = this.head_table[i]
    }
  }

  getMRP() {
    let paramsMRP = {
      period: this.period,
      _pokazatel: "МРП"
    }

    let responce: any

    this.select_budjetRas4et_Service
      .period_pokazatel_detail(paramsMRP)
      .subscribe(
        (data) => (
          responce = data,
          this.MRP = parseFloat(responce.znachenie)
        ),
        (error) => (
          this.select_dialog_msg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  getBDO() {
    let paramsMRP = {
      period: this.period,
      _pokazatel: "БДО"
    }

    let responce: any

    this.select_budjetRas4et_Service
      .period_pokazatel_detail(paramsMRP)
      .subscribe(
        (data) => (
          responce = data,
          this.BDO = parseFloat(responce.znachenie)
        ),
        (error) => (
          this.select_dialog_msg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  onRowClick(dopl: Ras4et_new_dopl, ri: number) {

    // let filter_dopl: any = []
    // filter_dopl = this.first_dopl.filter(item => item._doplata == dopl._doplata)


    // if (filter_dopl.length > 0) {
    //   if (filter_dopl[0].stavka_name !== '') {

    //     let params = {
    //       period: this.period,
    //       _pokazatel: filter_dopl[0].stavka_name
    //     }

    //     let responce: any

    //     this.select_budjetRas4et_Service
    //       .period_pokazatel_detail(params)
    //       .subscribe(
    //         (data) => (
    //           responce = data,
    //           this.rashetSummyStavka(dopl, responce.znachenie, filter_dopl, ri)
    //         ),
    //         (error) => (
    //           this.select_dialog_msg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
    //         )
    //       )
    //   }
    //   else {
    //     this.rashetSummy(dopl, filter_dopl, ri)
    //   }
    // }
    // else {
    //   this.select_dialog_msg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось найти доплату ' + dopl._doplata_name })
    // }
  }

  rashetSummy(dopl: Ras4et_new_dopl, filter_dopl: any, ri: number) {

    let mass: any;
    mass = [dopl];

    let aaa = '1234567890';
    for (let i = 0; i < mass.length; i++) {

      if (mass[i].columns_used !== '') {
        let formula = '';
        let mass_simv = mass[i].columns_used.split(' ');

        for (let y = 0; y < mass_simv.length; y++) {

          if (aaa.includes(mass_simv[y].slice(0, 1))) {
            formula = formula + this.tbl[mass_simv[y] - 1].zn_float;
          }
          else {
            formula = formula + mass_simv[y];
          }
        }
        this.rezult = math.evaluate(formula)
      }
    }

    dopl.summ = filter_dopl[0].summ * this.rezult / 100

    this.added_dopl.push(dopl),
      this.new_dopl.splice(ri, 1)

  }

  selectDolzhnost(dolzh_el: dolzhnost_element) {

    this.select_dialog_Detailref_dolzhnost = this.select_dialog_service_dolzhnost.open(DolznostSelectComponent,
      {
        header: 'Выбор должности',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.select_dialog_Detailref_dolzhnost.onClose.subscribe((dolzhnost_element: dolzhnost_element) => {
      if (dolzhnost_element) {
        dolzh_el.id = dolzhnost_element.id
        dolzh_el.name_rus = dolzhnost_element.name_rus

      }
    })
  }

  selectDoplNadb(dopl_nad: doplaty_nadbavky_element) {

    this.select_dialog_Detailref_dopl = this.select_dialog_service_dopl.open(DoplNadbavkaSelectComponent,
      {
        header: 'Выбор доплаты и надбавки',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.select_dialog_Detailref_dopl.onClose.subscribe((doplaty_nadbavky_element: doplaty_nadbavky_element) => {
      if (doplaty_nadbavky_element) {

        dopl_nad.id = doplaty_nadbavky_element.id
        dopl_nad.name_rus = doplaty_nadbavky_element.name_rus
      }
    })
  }

  selectOblreg(obl_reg: oblasti_element) {

    this.select_dialog_Detailref_obl = this.select_dialog_service_obl.open(OblastiRegionySelectComponent,
      {
        header: 'Выбор области регионов',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.select_dialog_Detailref_obl.onClose.subscribe((oblasti_element: oblasti_element) => {
      if (oblasti_element) {
        obl_reg.id = oblasti_element.id
        obl_reg.name = oblasti_element.name
      }
    })
  }

  selectMarkiAvto(marki: marki_avto_element) {

    this.select_dialog_Detailref_marki = this.select_dialog_service_marki.open(MarkiAvtoSelectComponent,
      {
        header: 'Выбор автомобиля',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.select_dialog_Detailref_marki.onClose.subscribe((marki_avto_element: marki_avto_element) => {
      if (marki_avto_element) {
        marki.id = marki_avto_element.id
        marki.name = marki_avto_element.name
      }
    })
  }

  selectCategorySotr(cat_sotr: category_sotr_element, ri: number) {

    this.select_dialog_Detailref_category = this.select_dialog_service_category.open(CategorySotrSelectComponent,
      {
        header: 'Выбор категории',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })

    this.select_dialog_Detailref_category.onClose.subscribe((category_sotr_element: category_sotr_element) => {
      if (category_sotr_element) {
        cat_sotr.id = category_sotr_element.id
        cat_sotr.name = category_sotr_element.name
        this.getKoefficient(ri)
      }
    })

  }

  selectStazh(stazh_cat: stazh_category_element, ri: number) {
    let _category_id = 0
    for (let i = 0; i < this.tbl.length; i++) {
      if (this.tbl[i].zn == 'category_sotr') {
        _category_id = this.tbl[i].zn_category_sotr.id
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
    this.select_dialog_Detailref_stazh = this.select_dialog_service_stazh.open(StazhCategorySelectComponent,
      {
        header: 'Выбор стажа',
        width: 'calc(60%)',
        height: 'calc(80%)',
        data: { category_id: _category_id }
      })

    this.select_dialog_Detailref_stazh.onClose.subscribe((stazh_category_element: stazh_category_element) => {
      if (stazh_category_element) {
        stazh_cat.name = stazh_category_element.name
        stazh_cat.id = stazh_category_element.id
        this.getKoefficient(ri)
      }
    })
    // }




  }

  getKoefficient(ri: number) {
    let _category_id = 0
    let _stazh_id = 0
    for (let i = 0; i < this.tbl.length; i++) {
      if (this.tbl[i].zn == 'category_sotr') {
        _category_id = this.tbl[i].zn_category_sotr.id
      }

      if (this.tbl[i].zn == 'stazh_category') {
        _stazh_id = this.tbl[i].zn_stazh_category.id
      }
    }

    if (_category_id !== 0 && _stazh_id !== 0) {

      let body = {
        _category_id: _category_id,
        _stazh_id: _stazh_id
      }

      let responce: any

      this.select_budjetRas4et_Service
        .getKoeff(body)
        .subscribe(
          (data) => (
            responce = data,
            this.PasteKoeff(ri, parseFloat(responce.znachenie))
          ),
          (error) => (this.select_dialog_msg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
        )
    }
  }

  PasteKoeff(ri: number, znachenie: number) {
    for (let i = 0; i < this.tbl.length; i++) {
      if (this.tbl[i].zn == 'float' && this.tbl[i].name == 'Коэффициент') {
        this.tbl[i].zn_float = znachenie
      }
    }
  }

  selectPodrazdelenie(podr_el: podrazdelenie_element) {

    this.select_dialog_Detailref_podr = this.select_dialog_service_podr.open(PodrazdelenieSelectComponent,
      {
        header: 'Выбор подразделении',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.select_dialog_Detailref_podr.onClose.subscribe((podrazdelenie_element: podrazdelenie_element) => {
      if (podrazdelenie_element) {
        podr_el.id = podrazdelenie_element.id
        podr_el.name_rus = podrazdelenie_element.name_rus
      }
    })
  }

  selectEd_Izm(ed_izm: ed_izm_element) {

    this.select_dialog_Detailref_ed_izm = this.select_dialog_service_ed_izm.open(EdIzmSelectComponent,
      {
        header: 'Выбор единицы измерения',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.select_dialog_Detailref_ed_izm.onClose.subscribe((ed_izm_element: ed_izm_element) => {
      if (ed_izm_element) {
        ed_izm.name = ed_izm_element.name
        ed_izm.id = ed_izm_element.id
      }
    })
  }

  selectENSTRU(ensTRU: ensTRU_element) {

    this.select_dialog_Detailref_ens = this.select_dialog_service_ens.open(OtborENSSelectComponent,
      {
        header: 'Выбор ЕНСТРУ',
        width: 'calc(60%)',
        height: 'calc(80%)',
        data: {
          _spec: this.head._spec.id,
          _form: this.head._form.id
        }
      })
    this.select_dialog_Detailref_ens.onClose.subscribe((ensTRU_element: otbor_ensTRU_element) => {
      if (ensTRU_element) {
        
        ensTRU.name_rus = ensTRU_element._enstru.name_rus
        ensTRU.id = ensTRU_element._enstru.id
      }
    })

  }





  onInputChange(value: number, kolon: any, ri: number) {
    let mass: any;
    let K_mass: any;
    let new_mass_simv: any
    if (value == undefined) {
      kolon.zn_float = 0;
    } else {
      kolon.zn_float = value;
    }

    mass = [this.tbl];

    let mass_arr = mass[0];

    let aaa = '1234567890';
    let kkk = 'К'
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

          K_mass = mass_simv[y][mass_simv[y].length - 1]

          if (kkk.includes(K_mass)) {
            mass_simv[y] = mass_simv[y].slice(0, -1)
            if (aaa.includes(mass_simv[y])) {
              formula = formula + mass_arr[mass_simv[y] - 1].zn_float;
            }
            else if (mass_simv[y] > mass_arr.length) {
              formula = formula + mass_simv[y];
            }
            else if (aaa.includes(mass_simv[y][1])) {
              formula = formula + mass_arr[mass_simv[y] - 1].zn_float;
            }

          }
          else if (mass_simv[y] == "БДО") {
            if (koeffBolshe100 == false) {
              formula = formula + this.BDO
            } else {
              formula = formula + 1
            }
          }
          else if (mass_simv[y] == "Р") {
            formula = formula + mass_arr[i].razmer;
          }
          else if (mass_simv[y] == "МРП") {
            formula = formula + this.MRP
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

  calculate() {
    let summdoc = 0;
    let mass: any = []

    for (let i = 0; i < this.tbl.length; i++) {
      mass = [this.tbl[i]];
      let mass_arr = mass[0];
      for (let y = 0; y < mass[0].length; y++) {
        if (mass_arr[y].itog) {
          summdoc = summdoc + mass_arr[y].zn_float;
        }
      }
    }
    this.summdoc = summdoc;
    // this.Ras4et_detail.head.summ = this.summdoc;
  }

  rashetSummyStavka(dopl: Ras4et_new_dopl, znachenie: number, filter_dopl: any, ri: number) {

    // let mass = dopl._sposob_ras.split(" ")

    // if (mass.length > 0) {

    //   if (mass[0] == 'Процент') {
    //     dopl.summ = dopl.summ * zn.znachenie / 100
    //   }
    //   else if (mass[0] == 'Количество') {
    //     dopl.summ = dopl.summ * zn.znachenie
    //   }
    // }
    if (dopl._sposob_ras == 'Процент МРП') {
      dopl.summ = filter_dopl[0].summ * znachenie / 100
    } else if (dopl._sposob_ras == 'Количество МРП') {
      dopl.summ = filter_dopl[0].summ * znachenie
    } else if (dopl._sposob_ras == 'Процент от БДО') {
      dopl.summ = filter_dopl[0].summ * znachenie / 100
    } else if (dopl._sposob_ras == 'Количество БДО') {
      dopl.summ = filter_dopl[0].summ * znachenie
    }

    this.added_dopl.push(dopl),
      this.new_dopl.splice(ri, 1)

  }

  onInputChangeString(value: string, kolon: any, ri: number) {
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

  onRowClickForDelete(dopl: Ras4et_new_dopl, ri: number) {

    this.new_dopl.push(dopl)
    this.added_dopl.splice(ri, 1)

  }

  saveDoplata() {
    this.copytbl = this.tbl

    this.select_dialog_Detailref.close(this.copytbl)
  }
}
