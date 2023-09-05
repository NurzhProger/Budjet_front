import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {func_group_detail,func_group_list} from '../interfaces';
import { MessageService } from 'primeng/api';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {FuncGroupService} from '../func-group.services';
@Component({
  selector: 'app-functional-group-detail',
  templateUrl: './functional-group-detail.component.html',
  styleUrls: ['./functional-group-detail.component.css']
})
export class FunctionalGroupDetailComponent implements OnInit {

  constructor(
    private FuncGroupService: FuncGroupService,
    private FuncGroup_Detailmsg: MessageService,
    private FuncGroup_Detailref: DynamicDialogRef,
    public FuncGroup_conf: DynamicDialogConfig) { }

  form: FormGroup
  func_detail: func_group_detail
  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required])
    })

    this.func_detail = this.FuncGroup_conf.data.func_detail
  }


  saveFungroup(){
    this.FuncGroup_Detailref.close()
  }

  closeCat(boll: boolean){
    this.FuncGroup_Detailref.close()
  }
}
