import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OtborENSDetailComponent } from '../../otborENS-element/otbor-ens-detail/otbor-ens-detail.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { otbor_ensTRU_element, otbor_ensTRU_list } from '../../interfaces';
import { Observable } from 'rxjs';
import { OtborEnsTRUService } from '../../otbor_enstru.service';
@Component({
  selector: 'app-otbor-ens-list',
  templateUrl: './otbor-ens-list.component.html',
  styleUrls: ['./otbor-ens-list.component.css']
})
export class OtborENSListComponent implements OnInit {

  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()


  constructor(
    private ensTRU_dialog_ref: DynamicDialogRef,
    private ensTRU_dialog_servis: DialogService,
    private OtborEnsTRUService: OtborEnsTRUService
  ) { }

  ens_TRU: Observable<otbor_ensTRU_list>
  first = 0
  rows = 25
  windowHeight: number
  selected: any

  ngOnInit(): void {
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
      limit: this.rows.toString(),
      offset: this.first.toString(),
    }
    this.ens_TRU = this.OtborEnsTRUService.fetch(params);
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
