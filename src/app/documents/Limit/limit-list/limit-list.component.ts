import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-limit-list',
  templateUrl: './limit-list.component.html',
  styleUrls: ['./limit-list.component.css']
})
export class LimitListComponent implements OnInit {
  @Input() data = false
  constructor() { }

  ngOnInit(): void {
  }

}
