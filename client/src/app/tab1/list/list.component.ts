import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input()
  list: any[];

  @Input()
  listType: string;

  loadingText: string;
  filteredList: any[];
  scrollCount: number = 25;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.filteredList = [...this.list];
  }

  loadMoreItems(scrolled) {
    this.filteredList = this.list.slice(0, this.list.length + this.scrollCount);
    scrolled.target.complete();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
