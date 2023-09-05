import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { CategoryIncomeDetailComponent } from '../category-income-detail/category-income-detail.component';
import { CategoryIncomeService } from '../category_income.service';
import { category_income_detail, category_income_select } from '../interfaces';



@Component({
  selector: 'app-category-income-select',
  templateUrl: './category-income-select.component.html',
  styleUrls: ['./category-income-select.component.css']
})
export class CategoryIncomeSelectComponent implements OnInit {

  constructor(
    private categoryService: CategoryIncomeService,
    private categoryref: DynamicDialogRef,
    private categoryconfirm: ConfirmationService,
    private categorySelectdialog: DialogService,
    private categorySelectmessage: MessageService,
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false;
  category$: Observable<category_income_select>
  NewCat: category_income_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: ''
  }
  searchcategory = ''
  first = 0
  rows = 25
  last = 3
  selected: any
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchCat(),
      this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.8;
  }

  closeform() {
    this.closeEvent.emit()
  }

  fetchCat() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }

    this.category$ = this.categoryService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchCat()
  }

  onRowEdit(cat: category_income_detail) {

    this.categoryref = this.categorySelectdialog.open(CategoryIncomeDetailComponent,
      {
        header: 'Редактирование категории',
        width: '60%',
        height: '40%',
        data: { cat_id: cat.id }
      })

    this.categoryref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchCat()
      }
    })
  }

  onSelected(cat: category_income_detail) {
    if (!this.selected) {
      this.categorySelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите категорию!' })
      return
    }
    this.categoryref.close(cat)
  }

  onRowClick(category_inc: category_income_detail) {
    this.categoryref.close(category_inc)
  }
  openNew() {
    this.categoryref = this.categorySelectdialog.open(CategoryIncomeDetailComponent,
      {
        header: 'Создание категории',
        width: '60%',
        height: '40%',
        data: { category: this.NewCat }
      })

    this.categoryref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchCat()
      }
    })

  }

  onDelete(cat: category_income_detail) {
    this.categoryconfirm.confirm({
      message: 'Вы действительно хотите удалить ' + cat.code + '?',
      header: 'Удаление категории',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(cat.id)
          .subscribe((data) => (
            this.categorySelectmessage.add({ severity: 'success', summary: 'Успешно', detail: 'Категория удалена!' }),
            this.fetchCat(), this.categoryconfirm.close()),
            (error) => (this.categorySelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить категорию!' }))
          )
      },
      reject: () => {
        this.categoryconfirm.close();
      }
    });
  }

  search() {

  }

}
