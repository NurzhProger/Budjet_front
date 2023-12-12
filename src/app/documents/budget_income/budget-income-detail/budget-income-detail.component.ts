import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-budget-income-detail',
  templateUrl: './budget-income-detail.component.html',
  styleUrls: ['./budget-income-detail.component.css']
})
export class BudgetIncomeDetailComponent implements OnInit {
  @Input() budjet_income_id = ''
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>();
  @Output() newItemEvent = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

}
