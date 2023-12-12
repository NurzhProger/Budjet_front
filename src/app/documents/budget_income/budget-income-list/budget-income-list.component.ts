import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-budget-income-list',
  templateUrl: './budget-income-list.component.html',
  styleUrls: ['./budget-income-list.component.css']
})
export class BudgetIncomeListComponent implements OnInit {

  constructor() { }
  @Output() closeEvent = new EventEmitter<any>()
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() data = false

  ngOnInit(): void {
  }

}
