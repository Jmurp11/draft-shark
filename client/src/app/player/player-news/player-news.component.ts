import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-news',
  templateUrl: './player-news.component.html',
  styleUrls: ['./player-news.component.scss'],
})
export class PlayerNewsComponent implements OnInit {

  @Input()
  news: any;

  showNews = false;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

  ngOnInit() { }
}
