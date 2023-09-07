import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { marki_avto_element, marki_avto_list } from '../interfaces';
import { MarkiAvtoService } from 'src/app/directory/planirovanie/marki_avto/marki-avto.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MarkiAvtoElementComponent } from '../marki-avto-element/marki-avto-element.component';

@Component({
  selector: 'app-marki-avto-list',
  templateUrl: './marki-avto-list.component.html',
  styleUrls: ['./marki-avto-list.component.css']
})
export class MarkiAvtoListComponent implements OnInit {

  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  marki_avto: Observable<marki_avto_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private MarkiAvtoService: MarkiAvtoService,
    private markiavto_dialog_ref: DynamicDialogRef,
    private marki_avto_dialog_servis: DialogService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.markiavto_dialog_ref = this.marki_avto_dialog_servis.open(MarkiAvtoElementComponent,
      {
        header: 'Создание авто',
        width: '60%',
        height: '60%',
        data: { markiavto_id: 0 }
      })

      this.markiavto_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.marki_avto = this.MarkiAvtoService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowClick(marki_avto: marki_avto_element) {
    if (this.data) {
      this.onRowEdit(marki_avto)
    }
    else {
      this.markiavto_dialog_ref.close(marki_avto) 
    }
  }

  onRowEdit(marki_avto: marki_avto_element) {
    this.markiavto_dialog_ref = this.marki_avto_dialog_servis.open(MarkiAvtoElementComponent,
      {
        header: 'Редактирование авто',
        width: '60%',
        height: '60%',
        data: { markiavto_id: marki_avto.id }
      })

    this.markiavto_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}

