import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToPlayer(id: number) {
    this.router.navigate([`tabs/players/${id}`]);
  }
}
