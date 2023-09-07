import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tip_topliva_list } from './interfaces';
import { TipToplivaService } from 'src/app/enums/tip_topliva/tip-topliva/tiptopliva.service'

@Component({
  selector: 'app-tip-topliva',
  templateUrl: './tip-topliva.component.html',
  styleUrls: ['./tip-topliva.component.css']
})
export class TipToplivaComponent implements OnInit {
  
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  first = 0
  rows = 25
  windowHeight: number
  selected: any
  tip_topliva: Observable<tip_topliva_list>

  constructor(
    private TipToplivaService: TipToplivaService
  ) { }
  
  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.tip_topliva = this.TipToplivaService.fetch();
  }

  closeform() {
    this.closeEvent.emit()
  }
}
