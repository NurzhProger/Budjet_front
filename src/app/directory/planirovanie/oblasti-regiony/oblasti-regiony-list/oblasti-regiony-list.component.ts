import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-oblasti-regiony-list',
  templateUrl: './oblasti-regiony-list.component.html',
  styleUrls: ['./oblasti-regiony-list.component.css']
})
export class OblastiRegionyListComponent implements OnInit {
  @Input() data = false
  constructor() { }

  ngOnInit(): void {
  }

}
