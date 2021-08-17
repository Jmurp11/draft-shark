import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-slides',
  templateUrl: './notes-slides.component.html',
  styleUrls: ['./notes-slides.component.scss'],
})
export class NotesSlidesComponent implements OnInit {

  @Input()
  notes: any[];

  showNotes = false;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

  ngOnInit() { }

}
