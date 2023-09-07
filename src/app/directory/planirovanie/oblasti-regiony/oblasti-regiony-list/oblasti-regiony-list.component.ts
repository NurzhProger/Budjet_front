import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { oblasti_element, oblasti_list } from '../interfaces';
import { OblastiService } from 'src/app/directory/planirovanie/oblasti-regiony/oblasti-regiony.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OblastiRegionyElementComponent } from '../oblasti-regiony-element/oblasti-regiony-element.component';
 
@Component({
  selector: 'app-oblasti-regiony-list',
  templateUrl: './oblasti-regiony-list.component.html',
  styleUrls: ['./oblasti-regiony-list.component.css']
})
export class OblastiRegionyListComponent implements OnInit {
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  oblasti: Observable<oblasti_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private OblastiService: OblastiService,
    private oblasti_dialog_ref: DynamicDialogRef,
    private oblasti_dialog_servis: DialogService

  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }
  openNew() {
    this.oblasti_dialog_ref = this.oblasti_dialog_servis.open(OblastiRegionyElementComponent,
      {
        header: 'Создание',
        width: '60%',
        height: '60%',
        data: { oblasti_id: 0 }
      })

      this.oblasti_dialog_ref.onClose.subscribe((save: boolean) => {
      
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
    this.oblasti = this.OblastiService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowClick(oblasti: oblasti_element) {
    if (this.data) {
      this.onRowEdit(oblasti)
    }
    else {
      this.oblasti_dialog_ref.close(oblasti) 
    }
  }

  onRowEdit(oblasti: oblasti_element) {
    this.oblasti_dialog_ref = this.oblasti_dialog_servis.open(OblastiRegionyElementComponent,
      {
        header: 'Редактирование',
        width: '60%',
        height: '60%',
        data: { oblasti_id: oblasti.id }
      })

    this.oblasti_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}
