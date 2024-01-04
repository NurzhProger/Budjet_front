import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { specification_expenses_detail } from 'src/app/directory/expenses/specification-exp/interfaces';
import { SpecificationExpSelectComponent } from 'src/app/directory/expenses/specification-exp/specification-exp-select/specification-exp-select.component';

@Component({
  selector: 'app-select-spec',
  templateUrl: './select-spec.component.html',
  styleUrls: ['./select-spec.component.css']
})
export class SelectSpecComponent implements OnInit {
  mass_spec: any = []
  constructor(
    private select_config: DynamicDialogConfig,
    private select_dialog_ref: DynamicDialogRef,
    private select_dialog_servis: DialogService,
    private select_dialog_Detailref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    if (this.select_config.data.spec[0].id !== 0) {
      this.mass_spec = JSON.parse(JSON.stringify(this.select_config.data.spec))
    }
  }

  openNew() {
    this.select_dialog_ref = this.select_dialog_servis.open(SpecificationExpSelectComponent,
      {
        header: 'Выбор специфики',
        width: '70%',
        height: '70%',
      })

    this.select_dialog_ref.onClose.subscribe((spec_detail: specification_expenses_detail) => {

      if (spec_detail) {
        this.mass_spec.push(spec_detail)
      }
    })
  }

  onDelete(ri: number) {
    this.mass_spec.splice(ri, 1)
  }

  save() {
    this.select_dialog_Detailref.close(this.mass_spec)
  }
}
