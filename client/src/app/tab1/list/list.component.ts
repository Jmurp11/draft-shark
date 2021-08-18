import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {


  subSink: Subscription = new Subscription();
  list: any[] = [];
  listType: string;
  loadingText: string;
  filteredList: any[];
  scrollCount: number = 25;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    const loadingData = await this.loadingController.create({
      message: `Grabbing ${this.listType}...`
    });

    this.subSink.add(
      this.route.params
        .pipe(
          tap(async ({ type }) => {
            this.listType = type;

            await loadingData.present();
            this.loadingText = `Loading more ${type}...`;
          }),
          switchMap(({ type }) => {
            return this.dashboardService.getDataSet(type);
          })).subscribe(result => {
            if (result) {
              loadingData.dismiss();
            }
            this.list = result;
            this.filteredList = [...this.list];
          })
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  loadMoreItems(scrolled) {
    this.filteredList = this.list.slice(0, this.list.length + this.scrollCount);
    scrolled.target.complete();
  }
}
