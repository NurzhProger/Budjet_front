import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { vid_transporta_list } from './interfaces';
import { VidTransportaService } from 'src/app/enums/vid_transporta/vid-transporta/vidtransporta.service'

@Component({
  selector: 'app-vid-transporta',
  templateUrl: './vid-transporta.component.html',
  styleUrls: ['./vid-transporta.component.css']
})
export class VidTransportaComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  first = 0
  rows = 25
  windowHeight: number
  selected: any
  vid_transporta: Observable<vid_transporta_list>
  constructor(
    private VidTransportaService: VidTransportaService
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
    this.vid_transporta = this.VidTransportaService.fetch();
  }

  closeform() {
    this.closeEvent.emit()
  }
}
