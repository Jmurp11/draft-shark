import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ApolloAngularSDK, FoldersQuery, NewsQuery, NotesQuery } from '../sdk/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  subSink: Subscription = new Subscription();
  notes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  news: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  folders: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private apolloSdk: ApolloAngularSDK
  ) { }

  prepareDashboard(): void {
    this.subSink.add(
      this.getNotes()
        .pipe(
          tap(({ data }) => this.setNotes(data.notes)),
          switchMap(() => this.getFolders()),
          tap(({ data }) => {
            this.setFolders(data.folders);
          }),
          switchMap(() => this.getNews())
        ).subscribe(({ data, loading }) => {
          this.setNews(data.news);
          this.setLoading(loading);
        })
    );
  }

  getDataSet(type: string): BehaviorSubject<any[]> {
    if (type === 'news') {
      return this.news;
    } else if (type === 'notes') {
      return this.notes;
    } else {
      return null
    }
  }

  setNotes(notes: any[]): void {
    this.notes.next(notes);
  }

  setNews(news: any[]): void {
    this.news.next(news);
  }

  setFolders(folders: any[]): void {
    this.folders.next(folders);
  }

  setLoading(loading: boolean): void {
    this.loading.next(loading);
  }

  getNotes(): Observable<ApolloQueryResult<NotesQuery>> {
    return this.apolloSdk.notesWatch(
      {
        data: {
          filterType: 'byCurrentUser'
        }
      }
    ).valueChanges;
  }

  getFolders(): Observable<ApolloQueryResult<FoldersQuery>> {
    return this.apolloSdk.foldersWatch(
      {
        data: {
          filterType: 'byCurrentUser'
        }
      }
    ).valueChanges;
  }

  getNews(): Observable<ApolloQueryResult<NewsQuery>> {
    return this.apolloSdk.newsWatch()
      .valueChanges;
  }
}
