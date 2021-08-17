import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stat-slide',
  templateUrl: './stat-slide.component.html',
  styleUrls: ['./stat-slide.component.scss'],
})
export class StatSlideComponent implements OnInit, OnChanges {

  @Input()
  stat: any;

  headers: any[];
  stats: any[];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'stat': {
            this.headers = Object.keys(this.stat);
            this.stats = Object.values(this.stat);
            break;
          }
        }
      }
    }
  }

  isNumber(val: any): boolean {
    if (typeof val === 'number') {
      return true;
    } else {
      return false;
    }
  }
}
