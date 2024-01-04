import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { podprogramm_detail } from 'src/app/directory/expenses/podprogramm/interfaces';
import { PodprogrammSelectComponent } from 'src/app/directory/expenses/podprogramm/podprogramm-select/podprogramm-select.component';

@Component({
  selector: 'app-select-podprogram',
  templateUrl: './select-podprogram.component.html',
  styleUrls: ['./select-podprogram.component.css']
})
export class SelectPodprogramComponent implements OnInit {

  mass_podprogram: any = []
  abp_id: number
  mass_program: any = []

  constructor(
    private select_config: DynamicDialogConfig,
    private select_dialog_ref: DynamicDialogRef,
    private select_dialog_servis: DialogService,
    private select_dialog_Detailref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.abp_id = this.select_config.data.abp_id
    this.mass_program = this.select_config.data.program
    if (this.select_config.data.podprogram[0].id !== 0) {
      this.mass_podprogram = JSON.parse(JSON.stringify(this.select_config.data.podprogram))
    }
  }

  openNew() {
    this.select_dialog_ref = this.select_dialog_servis.open(PodprogrammSelectComponent,
      {
        header: 'Выбор Подпрограммы',
        width: '70%',
        height: '70%',
        data: { abp_id: this.abp_id, program: this.mass_program }
      })

    this.select_dialog_ref.onClose.subscribe((podprogramm_detail: podprogramm_detail) => {

      if (podprogramm_detail) {
        this.mass_podprogram.push(podprogramm_detail)
      }
    })
  }

  onDelete(ri: number) {
    this.mass_podprogram.splice(ri, 1)
  }

  save() {
    this.select_dialog_Detailref.close(this.mass_podprogram)
  }

}
