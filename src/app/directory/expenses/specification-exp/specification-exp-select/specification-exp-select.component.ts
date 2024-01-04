import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { specification_expenses_detail, specification_expenses_select } from '../interfaces';
import { SpecificationExpDetailComponent } from '../specification-exp-detail/specification-exp-detail.component';
import { SpecificationExpensesService } from '../specification_exp.service';

@Component({
  selector: 'app-specification-exp-select',
  templateUrl: './specification-exp-select.component.html',
  styleUrls: ['./specification-exp-select.component.css']
})
export class SpecificationExpSelectComponent implements OnInit {

  constructor(
    private specService: SpecificationExpensesService,
    private specref: DynamicDialogRef,
    private specconfirm: ConfirmationService,
    private specSelectdialog: DialogService,
    private specSelectmessage: MessageService,) { }

  spec$: Observable<specification_expenses_select>
  NewSpec: specification_expenses_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: ''
  }
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  search = ''
  first = 0
  rows = 25
  specif: any
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchSpec(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.8;
  }

  closeform() {
    this.closeEvent.emit()
  }

  fetchSpec() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.search
    }

    this.spec$ = this.specService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchSpec()
  }

  onRowEdit(spec_inc: specification_expenses_detail) {

    this.specref = this.specSelectdialog.open(SpecificationExpDetailComponent,
      {
        header: 'Редактирование спецификации',
        width: '60%',
        height: '40%',
        data: { spec_inc: spec_inc }
      })

    this.specref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchSpec()
      }
    })
  }

  onRowClick(spec_inc: specification_expenses_detail) {
    this.specref.close(spec_inc)
  }

  onSelected(spec_inc: specification_expenses_detail) {
    if (!this.specif) {
      this.specSelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите специфику!' })
      return
    }
    this.specref.close(spec_inc)
  }

  openNew() {
    this.specref = this.specSelectdialog.open(SpecificationExpDetailComponent,
      {
        header: 'Создание спецификации',
        width: '60%',
        height: '40%',
        data: { spec_inc: this.NewSpec }
      })

    this.specref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchSpec()
      }
    })
  }

  onDelete(spec_inc: specification_expenses_detail) {
    this.specconfirm.confirm({
      message: 'Вы действительно хотите удалить ' + spec_inc.code + '?',
      header: 'Удаление спецификации',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.specService.deleteSpec(spec_inc.id)
          .subscribe((data) => (
            this.specSelectmessage.add({ severity: 'success', summary: 'Успешно', detail: 'Спецификация удалена!' }),
            this.fetchSpec(), this.specconfirm.close()),
            (error) => (this.specSelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить спецификацию!' }))
          )
      },
      reject: () => {
        this.specconfirm.close();
      }
    });
  }

  searh() {

  }

}
