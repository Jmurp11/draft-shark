import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PlayerListStoreService } from '../player-list-store.service';

@Component({
  selector: 'app-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.scss'],
})
export class PlayerListItemComponent implements OnInit {

  @Input()
  player: any;

  displayData: any;

  info: {
    title: string;
    value: {
      adp: number;
      age: string;
      ht: number;
      wt: string;
    };
  };
  summary: {
    title: string;
    value: {
      gp: number;
      tch: number;
      td: number;
      to: number;
    };
  };
  passing: {
    title: string;
    value: {
      att: number;
      cmp: number;
      cmpPerc: number;
      yds: number;
      td: number;
    };
  };
  receiving: {
    title: string;
    value: {
      tar: number;
      rec: number;
      yds: number;
      ypr: number;
      td: number;
    };
  };
  rushing: {
    title: string;
    value: {
      car: number;
      yds: number;
      ypc: number;
      td: number;
    };
  };
  displayDataOptions: any;

  constructor(
    private router: Router,
    private playerListStore: PlayerListStoreService) { }

  ngOnInit() {
    this.displayDataOptions = this.playerListStore.getDisplayDataOptions();

    this.playerListStore.stateChanged
      .pipe(
        switchMap(() => this.playerListStore.getListSettings())
      ).subscribe(setting => {
        this.populateSlideData(this.player);
        const slideOpts = [this.info, this.summary, this.passing, this.rushing, this.receiving];
        this.displayData = this.setSelectedStat(setting, slideOpts);
      });
  }

  populateSlideData(player) {
    this.info = {
      title: this.displayDataOptions.playerInfo,
      value: {
        adp: player.averageDraftPosition,
        age: `${this.getAge(player.birthDate)}`,
        ht: player.height,
        wt: `${player.weight}`
      }
    };
    this.summary = {
      title: this.displayDataOptions.playerSummary,
      value: {
        gp: player.stats[0]?.gamesPlayed,
        tch: player.stats[0]?.touches,
        td: player.stats[0]?.passTd + player.stats[0]?.rushTd + player.stats[0]?.receivingTd,
        to: player.stats[0]?.interception + player.stats[0]?.fumbles
      }
    };
    this.passing = {
      title: this.displayDataOptions.passing,
      value: {
        att: player.stats[0]?.attempts,
        cmp: player.stats[0]?.completions,
        cmpPerc: (player.stats[0]?.completionPercentage ? player.stats[0]?.completionPercentage : 0),
        yds: player.stats[0]?.passYards,
        td: player.stats[0]?.passTd
      }
    };
    this.receiving = {
      title: this.displayDataOptions.receiving,
      value: {
        tar: player.stats[0]?.targets,
        rec: player.stats[0]?.receptions,
        yds: player.stats[0]?.receivingYards,
        ypr: player.stats[0]?.yardsPerReception,
        td: player.stats[0]?.receivingTd
      }
    };
    this.rushing = {
      title: this.displayDataOptions.rushing,
      value: {
        car: player.stats[0]?.carries,
        yds: player.stats[0]?.rushYards,
        ypc: player.stats[0]?.yardsPerCarry,
        td: player.stats[0]?.rushTd
      }
    };
  }

  getAge(birthdate: string) {
    const birthday = new Date(birthdate);

    const today = new Date();

    let age = (today.getTime() - birthday.getTime()) / 1000;

    age /= (60 * 60 * 24);

    return Math.abs(Math.round(age / 365.25));
  }

  setSelectedStat(selectedStat: string, slideOptions: any[]): any {
    const dataSet = slideOptions.find(opt => selectedStat === opt.title);
    return dataSet.value;
  }

  navigateToPlayerPage(player: number) {
    this.router.navigate([`/tabs/players/${player}`]);
  }
}
