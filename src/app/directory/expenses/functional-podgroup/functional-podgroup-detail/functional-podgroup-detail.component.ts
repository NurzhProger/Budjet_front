import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {func_podgroup_detail,func_podgroup_list} from '../interfaces';
import { MessageService } from 'primeng/api';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {FuncPodgroupService} from '../func-podgroup.services';
@Component({
  selector: 'app-functional-podgroup-detail',
  templateUrl: './functional-podgroup-detail.component.html',
  styleUrls: ['./functional-podgroup-detail.component.css']
})
export class FunctionalPodgroupDetailComponent implements OnInit {

  constructor(
    private FuncpodGroupService: FuncPodgroupService,
    private FuncpodGroup_Detailmsg: MessageService,
    private FuncpodGroup_Detailref: DynamicDialogRef,
    public FuncpodGroup_conf: DynamicDialogConfig) { }

  form: FormGroup
  func_detail: func_podgroup_detail
  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required])
    })
    console.log(this.FuncpodGroup_conf.data.func_detail)
    this.func_detail = this.FuncpodGroup_conf.data.func_detail
  }


  saveFungroup(){
    if (this.func_detail.id > 0) {
      this.FuncpodGroupService.add(this.func_detail)
        .pipe(
          timeout(5000), // установка таймаута на 5 секунд
          catchError(error => {
            if (error.name === 'TimeoutError') {
              this.FuncpodGroup_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
            }
            else {
              this.FuncpodGroup_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            }
            return throwError('Произошла ошибка: ' + error.message);
          })

        )
        .subscribe(
          (data) => (this.FuncpodGroup_Detailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Категория успешно добавлена!' }), this.FuncpodGroup_Detailref.close(true)),
          (error) => (this.FuncpodGroup_Detailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
        )
    }

  }

  closeCat(boll: boolean){
    this.FuncpodGroup_Detailref.close(boll)
  }

}
