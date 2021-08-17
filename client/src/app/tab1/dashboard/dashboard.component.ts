import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ApolloAngularSDK } from 'src/app/sdk/generated/graphql';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  subSink: Subscription = new Subscription();
  newsList: any[];
  noteList: any[];
  truncate: boolean = true;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private apolloSdk: ApolloAngularSDK, private loadingController: LoadingController) { }

  async ngOnInit() {

    const loadingData = await this.loadingController.create({
      message: 'Setting Up Dashboard...'
    });

    await loadingData.present();

    this.subSink.add(
      this.getNotes()
        .pipe(
          tap(({ data }) => this.noteList = data.notes),
          switchMap(() => this.getNews())
        ).subscribe(({ data, loading }) => {
          this.newsList = data.news;
          if (!loading) {
            loadingData.dismiss();
          }
        })
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  getNotes() {
    return this.apolloSdk.notesWatch(
      {
        data: {
          filterType: 'byCurrentUser'
        }
      }
    ).valueChanges;
  }

  getNews() {
    return this.apolloSdk.newsWatch()
      .valueChanges;
  }

}
