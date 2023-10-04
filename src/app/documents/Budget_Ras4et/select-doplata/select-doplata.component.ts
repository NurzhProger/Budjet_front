import { Component, OnInit } from '@angular/core';
import { Ras4et_doc, Ras4et_dopl, Ras4et_new_dopl } from '../Budget_ras4et.interfaces';
import { Observable } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { log } from 'mathjs';

@Component({
  selector: 'app-select-doplata',
  templateUrl: './select-doplata.component.html',
  styleUrls: ['./select-doplata.component.css']
})
export class SelectDoplataComponent implements OnInit {

  new_dopl: [Ras4et_new_dopl]
  added_dopl: [Ras4et_dopl]
  constructor(
    private select_dialog_config: DynamicDialogConfig,
    private select_dialog_Detailref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.new_dopl = this.select_dialog_config.data.new_dopl
    this.added_dopl = this.select_dialog_config.data.added_dopl
    // if (this.added_dopl.length > 0) {
    //   for (let i = 0; this.added_dopl.length > i; i++) {
    //     this.new_dopl = this.new_dopl.filter(item => item._doplata !== this.added_dopl[i]._doplata)
    //   }

    // }
  }

  onRowClick(dopl: Ras4et_new_dopl, ri: number) {
    this.added_dopl.push(dopl)
    this.new_dopl.splice(ri, 1)

  }

  saveDoplata() {
    this.select_dialog_Detailref.close(this.added_dopl)
  }
}
