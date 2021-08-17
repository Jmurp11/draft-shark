import { Component, OnInit } from '@angular/core';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {

  constructor(private ui: UiService) { }

  ngOnInit() { }

  async openCreateNoteModal() {
    this.ui.openCreateNoteModal();
  }
}
