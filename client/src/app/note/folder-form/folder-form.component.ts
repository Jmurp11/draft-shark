import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-folder-form',
  templateUrl: './folder-form.component.html',
  styleUrls: ['./folder-form.component.scss'],
})
export class FolderFormComponent implements OnInit {

  title: string;

  constructor(
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.title = null;
  }

  onSave() {
    this.dismiss(this.title);
  }

  onCancel() {
    this.dismiss(null);
  }

  private dismiss(createFolder: string) {
    this.modalController.dismiss({
      dismissed: true,
      data: createFolder ? createFolder : null
    });
  }
}
