import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, throwError, timeout } from 'rxjs';
import { specification_income_detail } from '../interfaces';
import { SpecificationIncomeService } from '../specification_income.service';

@Component({
  selector: 'app-specification-income-detail',
  templateUrl: './specification-income-detail.component.html',
  styleUrls: ['./specification-income-detail.component.css']
})
export class SpecificationIncomeDetailComponent implements OnInit {

  constructor(
    private SpecService: SpecificationIncomeService,
    private SpecDetailconfig: DynamicDialogConfig,
    private SpecDetailmsg: MessageService,
    private SpecDetailref: DynamicDialogRef,
  ) { }

  form: FormGroup
  spec_detail: specification_income_detail

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required])
    })

    this.spec_detail = this.SpecDetailconfig.data.spec_inc
  }

  saveCategory() {
    if (this.spec_detail.id == 0) {
      this.SpecService.addSpec(this.spec_detail)
        .pipe(
          timeout(5000), // установка таймаута на 5 секунд
          catchError(error => {
            if (error.name === 'TimeoutError') {
              this.SpecDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
            }
            else {
              this.SpecDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            }
            return throwError('Произошла ошибка: ' + error.message);
          })

        )
        .subscribe(
          (data) => (this.SpecDetailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Категория успешно добавлена!' }), this.SpecDetailref.close(true)),
          (error) => (this.SpecDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
        )
    }
    else {
      this.SpecService.saveSpec(this.spec_detail)
        .pipe(
          timeout(5000), // установка таймаута на 5 секунд
          catchError(error => {
            if (error.name === 'TimeoutError') {
              this.SpecDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
            }
            else {
              this.SpecDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            }
            return throwError('Произошла ошибка: ' + error.message);
          })

        )
        .subscribe(
          (data) => (this.SpecDetailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Категория успешно отредактирована!' }), this.SpecDetailref.close(true)),
          (error) => (this.SpecDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }
  }

  closeCat(save: boolean) {
    this.SpecDetailref.close(save)
  }

}
