import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  @Input()
  news: any;

  @Input()
  truncate: boolean;

  constructor() { }

  ngOnInit() { }

}
