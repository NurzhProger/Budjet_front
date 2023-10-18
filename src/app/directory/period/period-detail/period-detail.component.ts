import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-period-detail',
  templateUrl: './period-detail.component.html',
  styleUrls: ['./period-detail.component.css']
})
export class PeriodDetailComponent implements OnInit {

  constructor(
    private period_ref: DynamicDialogRef,
  ) { }
  date = new Date
  ngOnInit(): void {

  }

  savePeriod() {
    this.period_ref.close(this.date)
  }

  closePeriod() {
    this.period_ref.close()
  }
}
