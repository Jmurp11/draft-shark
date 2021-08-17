import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApolloAngularSDK, PlayerArgs, TeamArgs } from 'src/app/sdk/generated/graphql';
import { PlayerListStoreService } from '../player-list-store.service';

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.scss'],
})
export class PlayerHomeComponent implements OnInit, OnDestroy {
  subSink: Subscription = new Subscription();
  playersList: any[] = [];
  playerListFiltered: any[] = [...this.playersList];
  positions: string[];
  teams: any[] = [];
  displayData: any;
  currentSearchTerm: string;
  scrollCount = 25;
  filter: {
    selectedTeam: any;
    selectedPosition: string;
  };
  settings: {
    selectedDisplayData: string;
  };

  constructor(
    private apolloSdk: ApolloAngularSDK,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private playerListStore: PlayerListStoreService
  ) { }

  async ngOnInit() {
    this.filter = {
      selectedTeam: null,
      selectedPosition: null
    };

    this.settings = {
      selectedDisplayData: null
    };

    this.displayData = this.playerListStore.getDisplayDataOptions();

    this.positions = [
      'All',
      'QB',
      'RB',
      'WR',
      'TE',
      'K'
    ];

    this.settings.selectedDisplayData = this.displayData.playerInfo;

    const loadingData = await this.showLoadingMessage('Grabbing Players...', null);

    this.subSink.add(
      this.getTeams()
        .subscribe(({ data }) => {
          this.teams = [
            {
              id: -1,
              fullName: 'All'
            },
            ...data.teams
          ];
        })
    );

    this.subSink.add(
      this.getPlayers().subscribe(({ data, loading }) => {
        this.playersList = data.players;

        this.playerListFiltered = this.playersList;

        if (!loading) {
          loadingData.dismiss();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  getPlayers() {
    const playersInput: PlayerArgs = {
      filterType: 'byNotStatus',
      status: 'Inactive',
      take: 450,
      skip: 0
    };

    return this.apolloSdk.playersWatch(
      {
        data: playersInput,
      },
      {
        fetchPolicy: 'cache-and-network'
      }
    )
      .valueChanges;
  }


  getTeams() {
    const teamsInput: TeamArgs = {
      filterType: null
    };

    return this.apolloSdk.teamsWatch({
      data: teamsInput
    })
      .valueChanges;
  }

  filterPlayers(event) {
    this.playerListFiltered = [...this.playersList];
    this.currentSearchTerm = event?.detail.value;

    if (!this.currentSearchTerm) {
      this.playerListFiltered = this.playerListFiltered.slice(0, 50);
      return;
    }

    this.playerListFiltered = this.searchArray(this.currentSearchTerm).slice(0, this.scrollCount);
  }

  searchArray(searchTerm: string) {
    return [...this.playersList].filter(player => {
      if (player.name && searchTerm) {
        return player.name.toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1 || player.id.toString().indexOf(searchTerm.toLowerCase()) > -1;
      }
    });
  }

  updateFilter(filters) {
    this.filter.selectedTeam = filters.team;
    this.filter.selectedPosition = filters.position;
  }

  async presentSettingsActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Data Options',
      buttons: [{
        text: this.displayData.playerInfo,
        handler: () => {
          this.playerListStore.setListSettings(this.displayData.playerInfo);
        }
      }, {
        text: this.displayData.playerSummary,
        handler: () => {
          this.playerListStore.setListSettings(this.displayData.playerSummary);
        }
      }, {
        text: this.displayData.passing,
        handler: () => {
          this.playerListStore.setListSettings(this.displayData.passing);
        }
      }, {
        text: this.displayData.rushing,
        handler: () => {
          this.playerListStore.setListSettings(this.displayData.rushing);
        }
      }, {
        text: this.displayData.receiving,
        handler: () => {
          this.playerListStore.setListSettings(this.displayData.receiving);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    await actionSheet.onDidDismiss();
  }

  selectDisplayData(displayData): void {
    this.displayData = displayData.detail.value;
  }

  async showLoadingMessage(message: string, duration: number | null) {
    const loadingData = await this.loadingController.create({
      message,
      duration
    });

    await loadingData.present();

    return loadingData;
  }
}
