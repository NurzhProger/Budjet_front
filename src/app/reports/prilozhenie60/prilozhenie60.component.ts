import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Prilozhenie60Service } from './prilojenie60.service';

@Component({
  selector: 'app-prilozhenie60',
  templateUrl: './prilozhenie60.component.html',
  styleUrls: ['./prilozhenie60.component.css']
})
export class Prilozhenie60Component implements OnInit {

  constructor(
    private service: Prilozhenie60Service,
    private messageServicePr60: MessageService
  ) { }

  loading = true;
  report: any = []

  ngOnInit(): void {
  }

  formReport() {
    return this.service
      .form()
      .subscribe(
        (data) => (this.report = data, this.loading = true),
        (error) => (this.messageServicePr60.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })))
  }

  closeform() {

  }

}
