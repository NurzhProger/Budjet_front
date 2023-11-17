import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorySotrService } from '../category-sotr.service';
import { category_sotr_list, category_sotr_element } from '../interfaces';
import { Observable } from 'rxjs';
import { CategorySotrElementComponent } from '../category-sotr-element/category-sotr-element.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-category-sotr-list',
  templateUrl: './category-sotr-list.component.html',
  styleUrls: ['./category-sotr-list.component.css']
})
export class CategorySotrListComponent implements OnInit {

  constructor(
    private categorySotrService: CategorySotrService,
    private category_sotr_dialog_ref: DynamicDialogRef,
    private category_sotr_dialog_servis: DialogService,
    private grconfig: DynamicDialogConfig,
    private message_confirm: ConfirmationService,
    private stazh_message: MessageService
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  category_sotrs$: Observable<category_sotr_list>
  first = 0
  rows = 25
  searchorg = ''
  selected: any
  windowHeight: number

  ngOnInit(): void {

    if (this.grconfig.data) {
      this.data = this.grconfig.data.etogruppa;
    }

    this.fetchList()
    this.updateWindowSize()

  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.category_sotr_dialog_ref = this.category_sotr_dialog_servis.open(CategorySotrElementComponent,
      {
        header: 'Создание категории сотрудников',
        width: '100%',
        height: '100%',
        data: { category_id: 0 }
      })

    this.category_sotr_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

  onSelected(category_sotr: category_sotr_element) {

  }

  onDelete(category: category_sotr_element) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categorySotrService.category_del(category.id)
          .subscribe((data) => (
            this.stazh_message.add(
              {
                severity: 'success',
                summary: 'Успешно',
                detail: ' Объект удален!'
              }
            ),
            this.fetchList(),
            this.message_confirm.close()
          ),
            (error) => (this.stazh_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
          )
      },
      reject: () => {
        this.message_confirm.close();
      }
    })
  }

  onRowClick(category: category_sotr_element) {

    if (this.grconfig.data) {
      this.category_sotr_dialog_ref.close(category)
    }

    else if (this.data) {
      this.onRowEdit(category)
    }
    else {
      this.category_sotr_dialog_ref.close(category)
    }
  }

  onRowEdit(category: category_sotr_element) {
    this.category_sotr_dialog_ref = this.category_sotr_dialog_servis.open(CategorySotrElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '100%',
        height: '80%',
        data: { category_id: category.id }
      })

    this.category_sotr_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

  search() {

  }

  fetchList() {

    let params = {
      etogruppa: !this.data,
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.category_sotrs$ = this.categorySotrService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit()
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }


}
