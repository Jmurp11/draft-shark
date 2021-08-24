import { Component, OnInit } from '@angular/core';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-create-folder-button',
  templateUrl: './create-folder-button.component.html',
  styleUrls: ['./create-folder-button.component.scss'],
})
export class CreateFolderButtonComponent implements OnInit {

  constructor(private ui: UiService) { }

  ngOnInit() { }

  async openCreateFolderModal() {
    this.ui.openCreateFolderModal();
  }

}
