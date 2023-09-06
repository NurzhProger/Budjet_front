import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ensTRU_element, ensTRU_list } from '../interfaces';
import { EnsTRUService } from '../enstru.service';
import { EnstruElementComponent } from '../enstru-element/enstru-element.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-enstru-list',
  templateUrl: './enstru-list.component.html',
  styleUrls: ['./enstru-list.component.css']
})
export class EnstruListComponent implements OnInit {

  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  tip_tru: Observable<ensTRU_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  pageEvent: number = 1;
  searchENS: string = '';
  constructor(
    private EnsTRUService: EnsTRUService,
    private ensTRU_dialog_ref: DynamicDialogRef,
    private ensTRU_dialog_servis: DialogService

  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.ensTRU_dialog_ref = this.ensTRU_dialog_servis.open(EnstruElementComponent,
      {
        header: 'Создание доплат и надбавок',
        width: '60%',
        height: '60%',
        data: { doplata_id: 0 }
      })

      this.ensTRU_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchENS: this.searchENS
    }
    this.tip_tru = this.EnsTRUService.fetch(params);
  }
  
  closeform() {
    this.closeEvent.emit();
  }

  onRowClick(tip_tru: ensTRU_element) {
    if (this.data) {
      this.onRowEdit(tip_tru)
    }
    else {
      this.ensTRU_dialog_ref.close(tip_tru) 
    }
  }

  onRowEdit(tip_tru: ensTRU_element) {
    this.ensTRU_dialog_ref = this.ensTRU_dialog_servis.open(EnstruElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '60%',
        data: { ensTRU_id: tip_tru.id }
      })

    this.ensTRU_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}
