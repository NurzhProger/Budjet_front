import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ClassIncomeDetailComponent } from '../class-income-detail/class-income-detail.component';
import { ClassIncomeService } from '../class-income.services';
import { class_income_detail, class_income_list } from '../interfaces';

@Component({
  selector: 'app-class-income-list',
  templateUrl: './class-income-list.component.html',
  styleUrls: ['./class-income-list.component.css']
})
export class ClassIncomeListComponent implements OnInit {

  constructor(
    private classService: ClassIncomeService,
    private classref: DynamicDialogRef,
    private classconfirm: ConfirmationService,
    private classListdialog: DialogService,
    private classListmessage: MessageService,
  ) { }
  
  class$: Observable<class_income_list>
  NewClass: class_income_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: ''
  }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  searchclass = ''
  first = 0
  rows = 25
  selected: any
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchClass(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  fetchClass() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searchclass.toString()
    }

    this.class$ = this.classService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchClass()
  }

  onRowEdit(class_inc: class_income_detail) {

    this.classref = this.classListdialog.open(ClassIncomeDetailComponent,
      {
        header: 'Редактирование класса',
        width: '60%',
        height: '40%',
        data: { class_inc: class_inc }
      })

    this.classref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchClass()
      }
    })
  }

  onRowClick(class_inc: class_income_detail) {
    if (this.data) {
      this.onRowEdit(class_inc)
    }
    else {
      this.classref.close(class_inc)
    }
  }

  closeform() {
    this.closeEvent.emit()
  }

  onSelected(class_income: class_income_detail) {
    if (!this.selected) {
      this.classListmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите класс!' })
      return
    }
    this.classref.close(class_income)
  }

  openNew() {
    this.classref = this.classListdialog.open(ClassIncomeDetailComponent,
      {
        header: 'Создание класса',
        width: '60%',
        height: '40%',
        data: { class_inc: this.NewClass }
      })

    this.classref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchClass()
      }
    })
  }

  onDelete(class_inc: class_income_detail) {
    this.classconfirm.confirm({
      message: 'Вы действительно хотите удалить ' + class_inc.code + '?',
      header: 'Удаление класса',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.classService.deleteClass(class_inc.id)
          .subscribe((data) => (
            this.classListmessage.add({ severity: 'success', summary: 'Успешно', detail: 'Класс удален!' }),
            this.fetchClass(), this.classconfirm.close()),
            (error) => (this.classListmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить класс!' }))
          )
      },
      reject: () => {
        this.classconfirm.close();
      }
    });
  }

  search() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searchclass.toString()
    }

    this.class$ = this.classService.fetch(params)
  }

}
