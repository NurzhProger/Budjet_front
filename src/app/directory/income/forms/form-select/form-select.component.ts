import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { formsService } from '../forms_servise';
import { Observable } from 'rxjs';
import { form_list, form_list_doc } from '../forms_interfaces';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements OnInit {

  constructor(
    private form_list_ryref: DynamicDialogRef,
    private form_list_messageServicedelSelect: MessageService,
    private form_list_dialog: DialogService,
    private form_Servise:formsService,
    private from_confrim:ConfirmationService)  { }


  @Output() newItemEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
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

 

  onSelected(form_doc: form_list_doc){
    if (!this.selected) {
      this.form_list_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите специфику!' })
      return
    }
    this.form_list_ryref.close(form_doc)
  }

  closeform(){

    this.closeEvent.emit()

  }

  onRowClick(form_doc: form_list_doc){
    this.form_list_ryref.close(form_doc)
  }

  onDelete(cat: form_list_doc) {
    // this.from_confrim.confirm({
    //   message: 'Вы действительно хотите удалить ' + cat.name + cat.head_form + '?',
    //   header: 'Удаление категории',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.form_Servise.deleteCategory(cat.id)
    //       .subscribe((data) => (
    //         this.categoryListmessage.add({ severity: 'success', summary: 'Успешно', detail: 'Категория удалена!' }),
    //         this.fetchCat(), this.categoryconfirm.close()),
    //         (error) => (this.categoryListmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить категорию!' }))
    //       )
    //   },
    //   reject: () => {
    //     this.categoryconfirm.close();
    //   }
    // });
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
