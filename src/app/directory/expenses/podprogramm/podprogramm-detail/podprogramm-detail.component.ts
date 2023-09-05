import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { podprogramm_detail, podprogramm_list } from '../interfaces';
import { podprogrammService } from '../podprogramm.services';

@Component({
  selector: 'app-podprogramm-detail',
  templateUrl: './podprogramm-detail.component.html',
  styleUrls: ['./podprogramm-detail.component.css']
})
export class PodprogrammDetailComponent implements OnInit {

  constructor(
    private PodPrService: podprogrammService,
    private PodPr_Detailmsg: MessageService,
    private PodPr_Detailref: DynamicDialogRef,
    public PodPr_conf: DynamicDialogConfig) { }

  form: FormGroup
  podpr_detail: podprogramm_detail

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required])
  })
  console.log(this.PodPr_conf.data.podpr_detail)
  this.podpr_detail = this.PodPr_conf.data.podpr_detail

}
}
