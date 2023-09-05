import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {abp_detail,abp_list} from '../interfaces';
import { MessageService } from 'primeng/api';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {abpService} from '../abp.services';

@Component({
  selector: 'app-abp-detail',
  templateUrl: './abp-detail.component.html',
  styleUrls: ['./abp-detail.component.css']
})
export class ABPDetailComponent implements OnInit {

  constructor(
  private abpService: abpService,
  private Abp_Detailmsg: MessageService,
  private Abp_Detailref: DynamicDialogRef,
  public Abp_conf: DynamicDialogConfig) { }


  form: FormGroup
  abp_detail: abp_detail
  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required])
    })
    this.abp_detail = this.Abp_conf.data.abp_list
  }

  saveabp(){

    this.Abp_Detailref.close()

  }

  closeabp(){
    this.Abp_Detailref.close()
  }

}
