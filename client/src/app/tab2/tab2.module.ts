import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab2Page } from './tab2.page';
import { PlayerListComponent } from '../player/player-list/player-list.component';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PlayerHomeComponent } from '../player/player-home/player-home.component';
import { PlayerDetailComponent } from '../player/player-detail/player-detail.component';
import { PlayerNewsComponent } from '../player/player-news/player-news.component';
import { StatSlidesComponent } from '../player/stat-slides/stat-slides.component';
import { NotesSlidesComponent } from '../player/notes-slides/notes-slides.component';
import { StatSlideComponent } from '../player/stat-slide/stat-slide.component';
import { PlayerListItemComponent } from '../player/player-list-item/player-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { NoteModule } from '../note/note.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    Tab2PageRoutingModule,
    NoteModule
  ],
  declarations: [
    Tab2Page,
    NotesSlidesComponent,
    PlayerDetailComponent,
    PlayerListComponent,
    PlayerListItemComponent,
    PlayerHomeComponent,
    PlayerNewsComponent,
    StatSlidesComponent,
    StatSlideComponent
  ]
})
export class Tab2PageModule { }
