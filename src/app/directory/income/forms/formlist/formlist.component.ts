import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { form_detail, form_list, form_list_doc } from "../forms_interfaces";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { MessageService,ConfirmationService } from 'primeng/api';
import { formsService } from '../forms_servise'
import { FormDetailComponent } from '../form-detail/form-detail.component';

@Component({
  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.css']
})
export class FormlistComponent implements OnInit {

  constructor(
    private form_list_ryref: DynamicDialogRef,
    private form_list_messageServicedelSelect: MessageService,
    private form_list_dialog: DialogService,
    private form_Servise:formsService,
    private message_confirm: ConfirmationService,
    private message_responce: MessageService
    )  { }


  @Output() newItemEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  @HostListener('window:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F9' && this.selected){
        if(this.selected.length > 0 ) {
          this.copySelectedRow()
          this.selected = []
      }
    }
  }
  form_detail: form_detail
  form_list$: Observable<form_list>
  searcforms = ''
  first = 0
  rows = 25
  last = 3
  selected: any
  windowHeight: number

  ngOnInit(): void {
    this.fetchCat()
  }

  fetchCat() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searcforms.toString()
    }

    this.form_list$ = this.form_Servise.fetch(params)
  }

  openNew(form_d: form_list_doc){
    this.newItemEvent.emit({ params: { selector: 'app-form-detail', nomer: 'Шаблон формы ', id: '' } });
  }

  onSelected(form_list: form_list_doc){

  }

  closeform(){

    this.closeEvent.emit()

  }

  onRowClick(form_doc: form_list_doc){
    this.newItemEvent.emit({ params: { selector: 'app-form-detail', nomer: 'Шаблон формы ' + form_doc.num_app, id: form_doc.id } });
  }


  copySelectedRow() { 
    
      // this.form_list_ryref = this.form_list_dialog.open(FormDetailComponent,
      //   {   
      //   header: 'Создание формы',
      //   width: '60%',
      //   height: '80%',    
        
      //   })
      //   if (this.selected) {
      //     this.form_list_ryref.onClose.subscribe
      //   }
      // console.log(this.selected);
      // let copy = Object.assign([0], this.selected);
      
    }
  


  onDelete(form: form_list_doc) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.form_Servise.form_del(form.id)
          .subscribe((data) => (
            this.message_responce.add(
              {
                severity: 'success',
                summary: 'Успешно',
                detail: ' Объект удален!'
              }
            ),
            this.fetchCat(),
            this.message_confirm.close()
          ),
            (error) => (this.message_responce.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
          )
      },
      reject: () => {
        this.message_confirm.close();
      }
    })
  }

  onRowEdit(form_doc: form_list_doc){
    this.newItemEvent.emit({ params: { selector: 'app-form-detail', nomer: 'Шаблон формы ' + form_doc.num_app, id: form_doc.id } });
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchCat()
  }

}
