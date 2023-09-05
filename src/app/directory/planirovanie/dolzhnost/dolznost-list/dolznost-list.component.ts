import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dolzhnost_element, dolzhnost_list } from '../interfaces';
import { Observable } from 'rxjs';
import { DolzhnostService } from '../dolzhnost.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DolznostElementComponent } from '../dolznost-element/dolznost-element.component';

@Component({
  selector: 'app-dolznost-list',
  templateUrl: './dolznost-list.component.html',
  styleUrls: ['./dolznost-list.component.css']
})
export class DolznostListComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  constructor(
    private DolzhnostService: DolzhnostService,
    private dolzhost_dialog_ref: DynamicDialogRef,
    private dolzhnost_dialog_servis: DialogService

  ) { }

  dolzhnost: Observable<dolzhnost_list>
  searchDolzhost = ''
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
    this.dolzhost_dialog_ref = this.dolzhnost_dialog_servis.open(DolznostElementComponent,
      {
        header: 'Создание должности',
        width: '60%',
        height: '60%',
        data: { dolzhnost_id: 0 }
      })

      this.dolzhost_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }

  search() {

  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.dolzhnost = this.DolzhnostService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit() 
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowClick(dolzh: dolzhnost_element) {
    
    if (this.data) {
      this.onRowEdit(dolzh)
    }
    else {
      this.dolzhost_dialog_ref.close(dolzh)
    }
  }

  onRowEdit(dolzh: dolzhnost_element) {
    
    this.dolzhost_dialog_ref = this.dolzhnost_dialog_servis.open(DolznostElementComponent,      
      {
        header: 'Редактирование должности',
        width: '60%',
        height: '60%',
        data: { dolzhnost_id: dolzh.id }
      })

    this.dolzhost_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}
