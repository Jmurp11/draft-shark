import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of } from 'rxjs';
import { StoreState } from '../AppStore';

@Injectable({
  providedIn: 'root'
})
export class PlayerListStoreService extends ObservableStore<StoreState> {
  initValue = 'Player Info';

  displayData = {
    playerInfo: 'Player Info',
    playerSummary: 'Player Summary',
    passing: 'Passing',
    rushing: 'Rushing',
    receiving: 'Receiving'
  };

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });

    const initalState = {
      listDataOption: this.initValue
    };
    this.setState(initalState, 'INIT_PLAYER_LIST_SETTINGS');
  }

  getListSettings(): Observable<string> {
    const dataOption = this.getState().listDataOption;
    return of(dataOption);
  }

  setListSettings(value: string) {
    this.setState({ listDataOption: value }, 'UPDATE_PLAYER_LIST_SETTINGS');
  }

  getDisplayDataOptions() {
    return this.displayData;
  }
}
