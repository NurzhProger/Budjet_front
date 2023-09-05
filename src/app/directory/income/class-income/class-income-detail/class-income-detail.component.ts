import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, throwError, timeout } from 'rxjs';
import { ClassIncomeService } from '../class-income.services';
import { class_income_detail } from '../interfaces';

@Component({
  selector: 'app-class-income-detail',
  templateUrl: './class-income-detail.component.html',
  styleUrls: ['./class-income-detail.component.css']
})
export class ClassIncomeDetailComponent implements OnInit {

  constructor(
    private ClassService: ClassIncomeService,
    private ClassDetailconfig: DynamicDialogConfig,
    private ClassDetailmsg: MessageService,
    private ClassDetailref: DynamicDialogRef,
  ) { }

  form: FormGroup
  class_detail: class_income_detail

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required])
    })

    this.class_detail = this.ClassDetailconfig.data.class_inc
  }

  saveCategory() {
    if (this.class_detail.id == 0) {
      this.ClassService.addClass(this.class_detail)
        .pipe(
          timeout(5000), // установка таймаута на 5 секунд
          catchError(error => {
            if (error.name === 'TimeoutError') {
              this.ClassDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
            }
            else {
              this.ClassDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            }
            return throwError('Произошла ошибка: ' + error.message);
          })

        )
        .subscribe(
          (data) => (this.ClassDetailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Категория успешно добавлена!' }), this.ClassDetailref.close(true)),
          (error) => (this.ClassDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
        )
    }
    else {
      this.ClassService.saveClass(this.class_detail)
        .pipe(
          timeout(5000), // установка таймаута на 5 секунд
          catchError(error => {
            if (error.name === 'TimeoutError') {
              this.ClassDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
            }
            else {
              this.ClassDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            }
            return throwError('Произошла ошибка: ' + error.message);
          })

        )
        .subscribe(
          (data) => (this.ClassDetailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Категория успешно отредактирована!' }), this.ClassDetailref.close(true)),
          (error) => (this.ClassDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }
  }

  closeCat(save: boolean) {
    this.ClassDetailref.close(save)
  }

}
