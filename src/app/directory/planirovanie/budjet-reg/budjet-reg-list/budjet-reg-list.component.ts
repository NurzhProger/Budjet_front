import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { budjet_reg_list } from './interfaces';
import { BudjetRegService } from './oblasti-regiony.service';

@Component({
  selector: 'app-budjet-reg-list',
  templateUrl: './budjet-reg-list.component.html',
  styleUrls: ['./budjet-reg-list.component.css']
})
export class BudjetRegListComponent implements OnInit {
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  budjet_reg: Observable<budjet_reg_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private BudjetRegService: BudjetRegService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {

  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.budjet_reg = this.BudjetRegService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }
}
