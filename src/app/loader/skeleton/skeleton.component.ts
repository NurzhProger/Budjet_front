import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements OnInit {

  products: any[];

  ngOnInit() {
    this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
  }

}
