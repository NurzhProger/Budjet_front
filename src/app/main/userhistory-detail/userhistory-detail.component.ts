import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-userhistory-detail',
  templateUrl: './userhistory-detail.component.html',
  styleUrls: ['./userhistory-detail.component.css']
})
export class UserhistoryDetailComponent implements OnInit {

  constructor(
    private start_config: DynamicDialogConfig
  ) { }

  history = []
  windowHeight: number

  ngOnInit(): void {
    this.updateWindowSize(),
      this.history = this.start_config.data.history
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  getColorClass(status: string): string {
    if (status == 'ok') {
      return 'green-class';
    }
    else {
      return 'red-class';
    }
  }

  getNameStatus(status: string): string {
    if (status == 'ok') {
      return 'Успех';
    }
    else {
      return 'Ошибка';
    }
  }

}
