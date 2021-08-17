import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  @Input()
  note: any;

  @Input()
  truncate: boolean;

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToPlayer(id: number) {
    this.router.navigate([`tabs/players/${id}`]);
  }
}
