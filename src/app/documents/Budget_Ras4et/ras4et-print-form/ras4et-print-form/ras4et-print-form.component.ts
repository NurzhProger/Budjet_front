import { Component, OnInit } from '@angular/core';
import { log } from 'mathjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Ras4etPrintService } from './ras4et_print.services';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-ras4et-print-form',
  templateUrl: './ras4et-print-form.component.html',
})
export class Ras4etPrintFormComponent implements OnInit {
  url: any = ''
  host = ''
  doc = {
    'id': 0
  }
  constructor(
    private Reportconfig: DynamicDialogConfig,
    private Ras4etPrintService: Ras4etPrintService,
    private sanitizer: DomSanitizer,
    private authservice: AuthService
  ) { this.host = this.authservice.host; }

  ngOnInit(): void {
    this.doc = this.Reportconfig.data.doc;
    this.toPrint()
  }

  toPrint() {
    let params = {
      id: this.doc.id,
    }

    this.Ras4etPrintService
      .getPrintForm(params)
      .subscribe
      (data => {
        let asd: any = data
        // let blob: Blob = new Blob([data], { type: 'application/pdf' });
        // let url = window.URL.createObjectURL(blob);
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.host + asd.status);
      })
  }

}
