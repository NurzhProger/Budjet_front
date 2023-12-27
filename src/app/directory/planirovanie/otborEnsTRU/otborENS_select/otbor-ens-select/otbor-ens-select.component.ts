import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OtborEnsTRUService } from '../../otbor_enstru.service';
import { otbor_ensTRU_element, otbor_ensTRU_list } from '../../interfaces';
import { Observable } from 'rxjs';
import { OtborENSDetailComponent } from '../../otborENS-element/otbor-ens-detail/otbor-ens-detail.component';

@Component({
  selector: 'app-otbor-ens-select',
  templateUrl: './otbor-ens-select.component.html',
  styleUrls: ['./otbor-ens-select.component.css']
})
export class OtborENSSelectComponent implements OnInit {

  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()


  constructor(
    private ensTRU_dialog_ref: DynamicDialogRef,
    private ensTRU_dialog_servis: DialogService,
    private OtborEnsTRUService: OtborEnsTRUService,
    private select_dialog_config: DynamicDialogConfig
  ) { }

  ens_TRU: Observable<otbor_ensTRU_list>
  first = 0
  rows = 25
  windowHeight: number
  selected: any
  _spec_id: 0
  _form_id: 0

  ngOnInit(): void {
    this._spec_id = this.select_dialog_config.data._spec
    this._form_id = this.select_dialog_config.data._form
    this.fetchList(),
      this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.ensTRU_dialog_ref = this.ensTRU_dialog_servis.open(OtborENSDetailComponent,
      {
        header: 'Создание',
        width: '60%',
        height: '60%',
        data: { ens_id: 0 }
      })

    this.ensTRU_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

  fetchList() {

    let params = {
      _form: {
        "id": this._form_id
      },
      _spec: {
        "id": this._spec_id
      }
    }
    this.ens_TRU = this.OtborEnsTRUService.fetchSelect(params);
  }

  closeform() {
    this.closeEvent.emit()
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowClick(dolzh: otbor_ensTRU_element) {

    if (this.data) {
      this.onRowEdit(dolzh)
    }
    else {
      this.ensTRU_dialog_ref.close(dolzh)
    }
  }

  onRowEdit(dolzh: otbor_ensTRU_element) {

    this.ensTRU_dialog_ref = this.ensTRU_dialog_servis.open(OtborENSDetailComponent,
      {
        header: 'Редактирование',
        width: '60%',
        height: '60%',
        data: { ens_id: dolzh.id }
      })

    this.ensTRU_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}
