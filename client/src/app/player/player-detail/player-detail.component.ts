import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { UiService } from '../../shared/ui.service';
import { ApolloAngularSDK } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {

  subSink: Subscription = new Subscription();
  player: any;
  notes: any;
  id: string;
  status: {
    status: string;
    icon: string;
    color: string;
  };
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
  advanced: {
    title: string;
    value: {
      rushOppShare: number;
      tarOppShare: number;
      rushProductionRating: number;
      recProductionRating: number;
    };
  };
  coachingInfo: {
    title: string;
    value: {
      hc: string;
      oc: string;
      scheme: string;
    };
  };
  teamSummary: {
    title: string;
    value: {
      top: string;
      plays: number;
      firstDowns: number;
      yards: number;
    }
  };
  teamScoring: {
    title: string;
    value: {
      td: number;
      redzone: number;
      to: number;
    }
  };
  teamPassing: {
    title: string;
    value: {
      firstDownsByPass: number;
      att: number;
      cmp: number;
      yards: number;
      ydsPerAtt: number;
      td: number;
    }
  };
  teamRushing: {
    title: string;
    value: {
      firstDownsByRush: number;
      att: number;
      yards: number;
      ydsPerAtt: number;
      td: number;
    }
  };
  conferenceInfo: {
    title: string;
    value: {
      conf: string;
      div: string;
      record: string;
    };
  };
  stadium: {
    title: string;
    value: {
      type: string;
      surface: string;
      city: string;
      state: string;
    };
  };
  playerSlides: any[];
  teamSlides: any[];
  news: any[];

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private ui: UiService
  ) { }

  async ngOnInit() {
    this.status = {
      status: null,
      icon: null,
      color: null
    };

    const loadingData = await this.loadingController.create({
      message: 'Grabbing Player Details...'
    });

    await loadingData.present();

    this.subSink.add(
      this.route.params
        .pipe(
          tap(({ id }) => {
            this.id = id;
          }),
          // eslint-disable-next-line arrow-body-style
          tap(() => {
            return this.getNotes(parseInt(this.id, 10))
              .subscribe(({ data }) => {
                this.notes = data.notes;
              });
          }),
          // eslint-disable-next-line arrow-body-style
          switchMap(() => {
            return this.apolloSdk.playerWatch({
              data: {
                filterType: 'byId',
                id: parseInt(this.id, 10)
              }
            }).valueChanges;
          })).subscribe(({ data, loading }) => {
            this.player = data.player;
            this.news = data.player.news;

            this.populateSlideData(this.player);

            this.playerSlides = [this.info, this.summary, this.passing, this.rushing, this.receiving, this.advanced];
            this.teamSlides = [this.teamSummary, this.teamScoring, this.teamPassing, this.teamRushing,
            this.coachingInfo, this.conferenceInfo, this.stadium];

            switch (this.player.status) {
              case 'Active':
                this.status.status = 'Healthy';
                this.status.icon = 'pulse-outline';
                this.status.color = 'success';
                break;
              case 'Injured Reserve':
                this.status.status = 'IR';
                this.status.icon = 'medkit-outline';
                this.status.color = 'danger';
                break;
              case 'Suspended':
                this.status.status = 'SUSP';
                this.status.icon = 'ban-outline';
                this.status.color = 'danger';
                break;
              default:
                console.log(this.player.status);
                break;
            }

            if (!loading) {
              loadingData.dismiss();
            }
          })
    );
  }

  getAge(birthdate: string) {
    const birthday = new Date(birthdate);

    const today = new Date();

    let age = (today.getTime() - birthday.getTime()) / 1000;

    age /= (60 * 60 * 24);

    return Math.abs(Math.round(age / 365.25));
  }

  populateSlideData(player) {
    this.info = {
      title: 'Player Info',
      value: {
        adp: player.averageDraftPosition,
        age: `${this.getAge(player.birthDate)}`,
        ht: player.height,
        wt: `${player.weight}`
      }
    };
    this.summary = {
      title: 'Player Summary',
      value: {
        gp: player.stats[0]?.gamesPlayed,
        tch: player.stats[0]?.touches,
        td: player.stats[0]?.passTd + player.stats[0]?.rushTd + player.stats[0]?.receivingTd,
        to: player.stats[0]?.interception + player.stats[0]?.fumbles
      }
    };
    this.passing = {
      title: 'Passing',
      value: {
        att: player.stats[0]?.attempts,
        cmp: player.stats[0]?.completions,
        cmpPerc: (player.stats[0]?.completionPercentage ? player.stats[0]?.completionPercentage : 0),
        yds: player.stats[0]?.passYards,
        td: player.stats[0]?.passTd
      }
    };
    this.receiving = {
      title: 'Receiving',
      value: {
        tar: player.stats[0]?.targets,
        rec: player.stats[0]?.receptions,
        yds: player.stats[0]?.receivingYards,
        ypr: player.stats[0]?.yardsPerReception,
        td: player.stats[0]?.receivingTd
      }
    };
    this.rushing = {
      title: 'Rushing',
      value: {
        car: player.stats[0]?.carries,
        yds: player.stats[0]?.rushYards,
        ypc: player.stats[0]?.yardsPerCarry,
        td: player.stats[0]?.rushTd
      }
    };
    this.advanced = {
      title: 'Advanced Stats',
      value: {
        rushOppShare: player.stats[0]?.carries / player.team.stats.rushingAttempts,
        tarOppShare: player.stats[0]?.targets / player.team.stats.passingAttempts,
        rushProductionRating: player.stats[0]?.rushYards / player.team.stats.rushingYards,
        recProductionRating: player.stats[0]?.receivingYards / player.team.stats.passingYards,
      }
    };
    this.teamSummary = {
      title: 'Team Summary',
      value: {
        top: player.team.stats.timeOfPossession,
        plays: player.team.stats.plays,
        firstDowns: player.team.stats.firstDowns,
        yards: player.team.stats.yards,
      }
    };
    this.teamScoring = {
      title: 'Team Scoring',
      value: {
        td: player.team.stats.touchdowns,
        redzone: player.team.stats.redzoneAttempts,
        to: player.team.stats.turnovers,
      }
    };
    this.teamPassing = {
      title: 'Team Passing',
      value: {
        firstDownsByPass: player.team.stats.firstDownsByPassing,
        att: player.team.stats.passingAttempts,
        cmp: player.team.stats.passingCompletions,
        yards: player.team.stats.passingYards,
        ydsPerAtt: player.team.stats.passingYardsPerAttempt,
        td: player.team.stats.passingTouchdowns,
      }
    };
    this.teamRushing = {
      title: 'Team Rushing',
      value: {
        firstDownsByRush: player.team.stats.firstDownsByRushing,
        att: player.team.stats.rushingAttempts,
        yards: player.team.stats.rushingYards,
        ydsPerAtt: player.team.stats.rushingYardsPerAttempt,
        td: player.team.stats.rushingTouchdowns,
      }
    };
    this.coachingInfo = {
      title: 'Coaching Info',
      value: {
        hc: player.team.headCoach,
        oc: player.team.offensiveCoordinator,
        scheme: player.team.offensiveScheme
      }
    };
    this.conferenceInfo = {
      title: 'Conference',
      value: {
        conf: player.team.conference,
        div: player.team.division,
        record: `${player.team.standings.wins}-${player.team.standings.losses}-${player.team.standings.ties}`
      }
    };
    this.stadium = {
      title: 'Stadium Info',
      value: {
        type: player.team.stadium.type,
        surface: player.team.stadium.playingSurface,
        city: player.team.stadium.city,
        state: player.team.stadium.state
      }
    };
  }

  async openCreateNoteModal() {
    this.ui.openCreateNoteModal();
  }

  private getNotes(playerId: any) {
    return this.apolloSdk.notesWatch(
      {
        data: {
          filterType: 'byCurrentUserAndPlayer',
          player: playerId
        }
      }
    )
      .valueChanges;
  }
}

// TODO: Add Targets -> <ion-icon name="disc-outline" color="success"></ion-icon>
