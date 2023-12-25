import { Component, OnInit } from '@angular/core';
import { Ras4et_new_dopl } from '../Budget_ras4et.interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { budjetRas4et_Service } from '../Budget_ras4et.Services'
import { MessageService } from 'primeng/api';
import * as math from 'mathjs';

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
    private select_dialog_Detailref: DynamicDialogRef,
    private select_dialog_msg: MessageService
  ) { }

  ngOnInit(): void {
    this.tbl = this.select_dialog_config.data.tbl
    this.new_ras = this.select_dialog_config.data.new_ras
    this.stroka = this.select_dialog_config.data.stroka
    this.period = this.select_dialog_config.data.period
    this.getMRP()
    this.getBDO()


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

  onRowClickForDelete(dopl: Ras4et_new_dopl, ri: number) {

    this.new_dopl.push(dopl)
    this.added_dopl.splice(ri, 1)

  }

  saveDoplata() {
    this.select_dialog_Detailref.close(this.tbl)
  }
}
