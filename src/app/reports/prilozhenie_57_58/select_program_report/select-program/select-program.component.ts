import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { programm_detail } from 'src/app/directory/expenses/programm/interfaces';
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
    private select_dialog_servis: DialogService,
    private select_dialog_Detailref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.abp_id = this.select_config.data.abp_id
    if (this.select_config.data.program[0].id !== 0) {
      this.mass_program = JSON.parse(JSON.stringify(this.select_config.data.program))
    }

  }

  openNew() {
    this.select_dialog_ref = this.select_dialog_servis.open(ProgrammSelectComponent,
      {
        header: 'Выбор программы',
        width: '70%',
        height: '70%',
        data: { abp_id: this.abp_id }
      })

    this.select_dialog_ref.onClose.subscribe((programm_detail: programm_detail) => {

      if (programm_detail) {
        this.mass_program.push(programm_detail)
      }
    })
  }


  onDelete(ri: number) {
    this.mass_program.splice(ri, 1)
  }

  save() {
    this.select_dialog_Detailref.close(this.mass_program)
  }
}
