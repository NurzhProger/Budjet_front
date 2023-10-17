import { Component, OnInit } from '@angular/core';
import { Ras4et_new_dopl } from '../Budget_ras4et.interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { budjetRas4et_Service } from '../Budget_ras4et.Services'
import { MessageService } from 'primeng/api';
import * as math from 'mathjs';

@Component({
  selector: 'app-select-doplata',
  templateUrl: './select-doplata.component.html',
  styleUrls: ['./select-doplata.component.css']
})
export class SelectDoplataComponent implements OnInit {

  new_dopl: [Ras4et_new_dopl]
  first_dopl: [Ras4et_new_dopl]
  added_dopl: any = []
  tbl: any = []
  period = ''
  rezult = 0

  constructor(
    private select_budjetRas4et_Service: budjetRas4et_Service,
    private select_dialog_config: DynamicDialogConfig,
    private select_dialog_Detailref: DynamicDialogRef,
    private select_dialog_msg: MessageService
  ) { }

  ngOnInit(): void {

    this.first_dopl = this.select_dialog_config.data.first_dopl
    this.new_dopl = this.select_dialog_config.data.new_dopl
    this.period = this.select_dialog_config.data.period
    if (this.select_dialog_config.data.added_dopl !== undefined) {
      this.added_dopl = this.select_dialog_config.data.added_dopl
    }
    this.tbl = this.select_dialog_config.data.tbl
  }

  onRowClick(dopl: Ras4et_new_dopl, ri: number) {

    let filter_dopl: any
    filter_dopl = this.first_dopl.filter(item => item._doplata == dopl._doplata)

    if (filter_dopl.length > 0) {
      if (filter_dopl[0].stavka_name !== '') {

        let params = {
          period: this.period,
          _pokazatel: filter_dopl[0].stavka_name
        }

        let responce: any

        this.select_budjetRas4et_Service
          .period_pokazatel_detail(params)
          .subscribe(
            (data) => (
              responce = data,
              this.rashetSummyStavka(dopl, responce.znachenie, filter_dopl, ri)
            ),
            (error) => (
              this.select_dialog_msg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
            )
          )
      }
      else {
        this.rashetSummy(dopl, filter_dopl, ri)
      }
    }
    else {
      this.select_dialog_msg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось найти доплату ' + dopl._doplata_name })
    }
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

    dopl.summ = dopl.summ * this.rezult / 100
    this.added_dopl.push(dopl),
      this.new_dopl.splice(ri, 1)

  }

  rashetSummyStavka(dopl: Ras4et_new_dopl, znachenie: number, filter_dopl: any, ri: number) {

    // let mass = dopl._sposob_ras.split(" ")

    // if (mass.length > 0) {
    //   console.log(zn);

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
    }

    this.added_dopl.push(dopl),
      this.new_dopl.splice(ri, 1)

  }

  onRowClickForDelete(dopl: Ras4et_new_dopl, ri: number) {

    this.new_dopl.push(dopl)
    this.added_dopl.splice(ri, 1)

  }

  saveDoplata() {
    this.select_dialog_Detailref.close(this.added_dopl)
  }
}
