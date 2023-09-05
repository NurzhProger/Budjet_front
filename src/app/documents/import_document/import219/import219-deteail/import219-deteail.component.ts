import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { import219_detail } from '../interfaces';
import { import219Servise } from '../import219.servise';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadComponent } from '../upload/upload.component';


@Component({
  selector: 'app-import219-deteail',
  templateUrl: './import219-deteail.component.html',
  styleUrls: ['./import219-deteail.component.css']
})
export class Import219DeteailComponent implements OnInit {
  uploadedFiles: any[] = [];
  items: MenuItem[];
  form: FormGroup
  other: boolean = false;

  constructor(private messageService: MessageService,
  private DialogService: DialogService,
  public uploadref: DynamicDialogRef ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl()
    });
  }



  saveDoc(close: boolean): void {

  }

  closeform(close: boolean): void {

  }

  changedate(){

  }


  openUpload() {
    this.uploadref = this.DialogService.open(UploadComponent,
        {
            header: 'Импорт формы',
            width: '25%',
            height: '35%',
            data: this.other
        });
}
}
