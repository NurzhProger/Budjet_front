import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ed_izm_element, ed_izm_list } from '../interfaces';
import { Observable } from 'rxjs';
import { EdIzmService } from 'src/app/directory/planirovanie/ed-izm/ed-izm.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EdIzmElementComponent } from '../ed-izm-element/ed-izm-element.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ed-izm-select',
  templateUrl: './ed-izm-select.component.html',
  styleUrls: ['./ed-izm-select.component.css']
})
export class EdIzmSelectComponent implements OnInit {
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  ed_izm: Observable<ed_izm_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private EdIzmService: EdIzmService,
    private edizm_dialog_ref: DynamicDialogRef,
    private edizm_dialog_servis: DialogService,
    private edizm_message_service: MessageService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  onSelected(ed_izm:ed_izm_element) {
    if (!this.selected) {
    this.edizm_message_service.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите ед.измерению!' })
    return
    }
    this.edizm_dialog_ref.close(ed_izm)
    }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.ed_izm = this.EdIzmService.fetch(params);
  }

  onRowClick(ed_izm: ed_izm_element) {
    if (this.data) {
      this.onRowEdit(ed_izm)
    }
    else {
      this.edizm_dialog_ref.close(ed_izm) 
    }
  }

  onRowEdit(ed_izm: ed_izm_element) {
    this.edizm_dialog_ref = this.edizm_dialog_servis.open(EdIzmElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '60%',
        data: { edizm_id: ed_izm.id }
      })

    this.edizm_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}
