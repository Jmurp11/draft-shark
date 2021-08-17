import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NoteModule } from '../note/note.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SharedModule,
    NoteModule
  ],
  declarations: [Tab1Page, DashboardComponent]
})
export class Tab1PageModule { }
