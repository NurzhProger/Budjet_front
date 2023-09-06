import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vid-transporta',
  templateUrl: './vid-transporta.component.html',
  styleUrls: ['./vid-transporta.component.css']
})
export class VidTransportaComponent implements OnInit {
  @Input() data = false
  constructor() { }

  ngOnInit(): void {
  }

}
