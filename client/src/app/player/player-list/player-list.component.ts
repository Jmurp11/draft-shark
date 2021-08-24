import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {

  @Input()
  playersList: Player[];

  @Input()
  playerListFiltered: Player[];

  @Input()
  scrollCount: number;

  @Input()
  currentSearchTerm: string;

  @Input()
  searchArray: (args: string) => any[];

  constructor() { }

  ngOnInit() { }

  loadMorePlayers(event) {
    if (!this.currentSearchTerm) {
      this.playerListFiltered = this.playersList.slice(0, this.playerListFiltered.length + this.scrollCount);
    } else {
      this.playerListFiltered = this.searchArray(this.currentSearchTerm).slice(0, this.playerListFiltered.length + this.scrollCount);
    }
    event.target.complete();
  }
}
