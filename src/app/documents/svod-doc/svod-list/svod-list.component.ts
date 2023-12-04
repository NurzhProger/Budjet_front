import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { svod_doc, svod_list } from '../interfaces';
import { Observable } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SvodService } from '../svod.servise';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-svod-list',
  templateUrl: './svod-list.component.html',
  styleUrls: ['./svod-list.component.css']
})
export class SvodListComponent implements OnInit {

 
  constructor(
    private svod_list_ryref: DynamicDialogRef,
    private svod_service: SvodService,
    private svod_confrim: ConfirmationService,
    private Svod_doc_Service: SvodService,
    private svod_message: MessageService

  ) { }
  @Output() closeEvent = new EventEmitter<any>()
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() data = false
  Svod_list$: Observable<svod_list>
  windowHeight: number
  selected: any
  search: ''
  first = 0
  rows = 25

  ngOnInit(): void {
    this.fetch()
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }
  
  openNew() {
    this.newItemEvent.emit({ params: { selector: 'app-svod-detail', nomer: 'Свод бюджетной заявки', id: '' } });
  }
  fetch(){
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.Svod_list$ = this.svod_service.fetch(params)
    
  }
  closeform(){
    this.closeEvent.emit()
  }
  
  onRowEdit(svod: svod_doc) {

    this.newItemEvent.emit({ params: { selector: 'app-svod-detail', nomer: 'Свод бюджетной заявки' + svod.nom, id: svod.id } });


  }

  onRowClick(svod: svod_doc) {
    if (this.data) {
      this.onRowEdit(svod)
    }
    else {
      this.svod_list_ryref.close(svod)
    }
  }

  onDelete(item: svod_doc) {
    let msg = !item.deleted ? "Пометить " + item.nom + " на удаление?" : "Снять с " + item.nom + " пометку на удаление?"
    let header = !item.deleted ? "Пометка на удаление" : "Снять с пометки на удаление"
    let msgsuccess = !item.deleted ? "Документ помечен на удаление" : "С документа снята пометка на удаление"

    this.svod_confrim.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Svod_doc_Service.deleteReq(item.id)
          .subscribe((data) => (
            this.svod_message.add({ severity: 'success', summary: 'Успешно', detail: msgsuccess }),
            this.fetch(),
            this.svod_confrim.close()
          ),
            (error) => (
              this.svod_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
            )
          )
      },
      reject: () => {
        this.svod_confrim.close();
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetch()
  }

  setClass(deleted: boolean) {
    let classs = ''

    if (deleted) {
      classs = 'class-deleted'
    }

    return classs

  }
}
