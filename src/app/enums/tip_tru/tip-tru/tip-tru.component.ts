import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipTruService } from './tiptru.service';
import { tip_tru_list } from './interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tip-tru',
  templateUrl: './tip-tru.component.html',
  styleUrls: ['./tip-tru.component.css']
})
export class TipTruComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  first = 0
  rows = 25
  windowHeight: number
  selected: any
  tip_tru: Observable<tip_tru_list>
  constructor(
    private TipTruService: TipTruService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  closeform () {
    this.closeEvent.emit()
  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.tip_tru = this.TipTruService.fetch();
    
  }
}
