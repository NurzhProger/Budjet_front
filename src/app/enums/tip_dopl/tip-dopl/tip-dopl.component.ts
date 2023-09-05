import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { doplata_list } from './interfaces';
import { DoplataService } from './doplata.service';

@Component({
  selector: 'app-tip-dopl',
  templateUrl: './tip-dopl.component.html',
  styleUrls: ['./tip-dopl.component.css']
})
export class TipDoplComponent implements OnInit {


  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  doplaty: Observable<doplata_list>
  first = 0
  rows = 25
  windowHeight: number
  selected: any
  constructor(
    private DoplataService: DoplataService
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
    this.doplaty = this.DoplataService.fetch();
    
  }

  closeform () {
    this.closeEvent.emit()
  }

 
}
