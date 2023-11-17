import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { koeff_category_element, koeff_category_list } from '../interfaces';
import { KoeffCategoryService } from '../koeff-category.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { KoeffElementComponent } from '../koeff-element/koeff-element.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-koeff-category-list',
  templateUrl: './koeff-category-list.component.html',
  styleUrls: ['./koeff-category-list.component.css']
})
export class KoeffCategoryListComponent implements OnInit {


  constructor(
    private koeffCategoryService: KoeffCategoryService,
    private dialog_ref: DynamicDialogRef,
    private koeff_category_dialog_servis: DialogService,
    private koeff_category_dialog_ref: DynamicDialogRef,
    private message_confirm: ConfirmationService,
    private message_responce: MessageService
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  koeff_category$: Observable<koeff_category_list>

  searchkoeff = ''
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
  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }
  openNew() {
    this.dialog_ref = this.koeff_category_dialog_servis.open(KoeffElementComponent,
      {
        header: 'Создание коэффициента',
        width: '60%',
        height: '60%',
        data: { koeff_id: 0 }
      })

    this.dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

  onDelete(koeff: koeff_category_element) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.koeffCategoryService.koeff_del(koeff.id)
          .subscribe((data) => (
            this.message_responce.add(
              {
                severity: 'success',
                summary: 'Успешно',
                detail: ' Объект удален!'
              }
            ),
            this.fetchList(),
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

  search() {

  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.koeff_category$ = this.koeffCategoryService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit()
  }

  onRowClick(koeff: koeff_category_element) {
    if (this.data) {
      this.onRowEdit(koeff)
    }
    else {
      this.koeff_category_dialog_ref.close(koeff)
    }
  }

  onRowEdit(koeff: koeff_category_element) {
    this.koeff_category_dialog_ref = this.koeff_category_dialog_servis.open(KoeffElementComponent,
      {
        header: 'Редактирование коэффициента категории',
        width: '60%',
        height: '60%',
        data: { koeff_id: koeff.id }
      })

    this.koeff_category_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }
}
