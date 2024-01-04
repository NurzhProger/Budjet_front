import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProgrammSelectComponent } from 'src/app/directory/expenses/programm/programm-select/programm-select.component';

@Component({
  selector: 'app-select-program',
  templateUrl: './select-program.component.html',
  styleUrls: ['./select-program.component.css']
})
export class SelectProgramComponent implements OnInit {
  mass_program: any = []
  abp_id: number
  constructor(
    private select_config: DynamicDialogConfig,
    private select_dialog_ref: DynamicDialogRef,
    private select_dialog_servis: DialogService
  ) { }

  ngOnInit(): void {
    this.abp_id = this.select_config.data.abp_id
    this.mass_program = this.select_config.data.program
  }

  openNew() {
    this.select_dialog_ref = this.select_dialog_servis.open(ProgrammSelectComponent,
      {
        header: 'Выбор программы',
        width: '70%',
        height: '70%',
        data: { abp_id: this.abp_id }
      })

    this.select_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        // this.fetchList()
      }
    })
  }
}
