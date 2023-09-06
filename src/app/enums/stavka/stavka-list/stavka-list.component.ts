import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { stavka_list } from './interfaces';
import { StavkaService } from './stavka.service';

@Component({
  selector: 'app-stavka-list',
  templateUrl: './stavka-list.component.html',
  styleUrls: ['./stavka-list.component.css']
})
export class StavkaListComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  first = 0
  rows = 25
  windowHeight: number
  selected: any
  stavka: Observable<stavka_list>
  constructor(
    private StavkaService: StavkaService
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
    this.stavka = this.StavkaService.fetch();
  }

  closeform() {
    this.closeEvent.emit()
  }

}
