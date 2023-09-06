import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tip-topliva',
  templateUrl: './tip-topliva.component.html',
  styleUrls: ['./tip-topliva.component.css']
})
export class TipToplivaComponent implements OnInit {
  @Input() data = false
  constructor() { }

  ngOnInit(): void {
  }

}
