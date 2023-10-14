import { Component, OnInit } from '@angular/core';
import { Ras4et_new_dopl } from '../Budget_ras4et.interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { budjetRas4et_Service } from '../Budget_ras4et.Services'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-select-doplata',
  templateUrl: './select-doplata.component.html',
  styleUrls: ['./select-doplata.component.css']
})
export class SelectDoplataComponent implements OnInit {

  new_dopl: [Ras4et_new_dopl]
  added_dopl: any = []
  tbl: any = []
  period = ''

  constructor(
    private select_budjetRas4et_Service: budjetRas4et_Service,
    private select_dialog_config: DynamicDialogConfig,
    private select_dialog_Detailref: DynamicDialogRef,
    private select_dialog_msg: MessageService
  ) { }

  ngOnInit(): void {

    this.new_dopl = this.select_dialog_config.data.new_dopl
    this.period = this.select_dialog_config.data.period

    if (this.select_dialog_config.data.added_dopl !== undefined) {
      this.added_dopl = this.select_dialog_config.data.added_dopl
    }
    console.log(this.new_dopl);
  }

  onRowClick(dopl: Ras4et_new_dopl, ri: number) {

    let params = {
      period: this.period,
      _pokazatel: dopl.stavka_name
    }
    let zn: any

    this.select_budjetRas4et_Service
      .period_pokazatel_detail(params)
      .subscribe(
        (data) => (
          this.rashetSummy(dopl, data, ri)
        ),
        (error) => (
          this.select_dialog_msg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  rashetSummy(dopl: Ras4et_new_dopl, zn: any, ri: number) {

    let mass = dopl._sposob_ras.split(" ")
    if (mass.length > 0) {
      if (mass[0] == 'Процент') {
        dopl.summ = dopl.summ * zn.znachenie / 100
      }
      else if (mass[0] == 'Количество') {
        dopl.summ = dopl.summ * zn.znachenie
      }
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
