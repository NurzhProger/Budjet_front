import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {podclass_interfaces_detail,podclass_interfaces} from '../podclass_interfaces';
import { MessageService } from 'primeng/api';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {podclassService} from '../podclass_servise';

@Component({
  selector: 'app-podclass-detail',
  templateUrl: './podclass-detail.component.html',
  styleUrls: ['./podclass-detail.component.css']
})


export class PodclassDetailComponent implements OnInit {

  constructor(
    private podclass_Service: podclassService,
    private Podclass_Detailmsg: MessageService,
    private Podclass_Detailref: DynamicDialogRef,
    public podclassconf: DynamicDialogConfig) { }
  form: FormGroup
  podclass_detail: podclass_interfaces_detail

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required])
    })

    this.podclass_detail = this.podclassconf.data.podclass
    console.log(this.podclass_detail)

  }

  saveCategory() {
    if (this.podclass_detail.id == 0) {
      this.podclass_Service.addpodclass(this.podclass_detail)
        .pipe(
          timeout(5000), // установка таймаута на 5 секунд
          catchError(error => {
            if (error.name === 'TimeoutError') {
              this.Podclass_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
            }
            else {
              this.Podclass_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            }
            return throwError('Произошла ошибка: ' + error.message);
          })

        )
        .subscribe(
          (data) => (this.Podclass_Detailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Категория успешно добавлена!' }), this.Podclass_Detailref.close(true)),
          (error) => (this.Podclass_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
        )
    }
    else {
      this.podclass_Service.savepodclass(this.podclass_detail)
        .pipe(
          timeout(5000), // установка таймаута на 5 секунд
          catchError(error => {
            if (error.name === 'TimeoutError') {
              this.Podclass_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
            }
            else {
              this.Podclass_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            }
            return throwError('Произошла ошибка: ' + error.message);
          })

        )
        .subscribe(
          (data) => (this.Podclass_Detailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Категория успешно отредактирована!' }), this.Podclass_Detailref.close(true)),
          (error) => (this.Podclass_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }
  }

  closeCat(save: boolean) {
    this.Podclass_Detailref.close(save)
  }


}
