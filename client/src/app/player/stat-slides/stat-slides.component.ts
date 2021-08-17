import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stat-slides',
  templateUrl: './stat-slides.component.html',
  styleUrls: ['./stat-slides.component.scss'],
})
export class StatSlidesComponent implements OnInit, OnChanges {

  @Input()
  slides: any[];

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'slides': {
            break;
          }
        }
      }
    }
  }

}
