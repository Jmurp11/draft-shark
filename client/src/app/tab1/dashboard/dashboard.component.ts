import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { UiService } from 'src/app/shared/ui.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  subSink: Subscription = new Subscription();
  newsList: any[];
  noteList: any[];
  folders: any[];
  truncate: boolean = true;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    public uiService: UiService,
    private dashboardService: DashboardService,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {

    const loadingData = await this.loadingController.create({
      message: 'Setting Up Dashboard...'
    });

    await loadingData.present();

    this.subSink.add(
      this.dashboardService.notes
        .pipe(
          tap((notes) => this.noteList = notes),
          switchMap(() => this.dashboardService.news),
          tap((news) => this.newsList = news),
          switchMap(() => this.dashboardService.folders),
          tap((folders) => {
            const notesWithNoFolder = {
              id: 0,
              title: 'Loose Notes',
              creationTime: new Date(),
              updatedTime: new Date(),
              notes: [...this.noteList]
            };
            this.folders = [...folders, notesWithNoFolder];
          }),
          switchMap(() => this.dashboardService.loading)
        ).subscribe((loading) => {
          if (!loading) {
            loadingData.dismiss();
          }
        })
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
