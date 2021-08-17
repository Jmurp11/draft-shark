import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { IonicModule } from '@ionic/angular';
import { MentionModule } from 'angular-mentions';
import { FormsModule } from '@angular/forms';
import { FolderListComponent } from './folder-list/folder-list.component';
import { NewsComponent } from './news/news.component';



@NgModule({
  declarations: [
    NoteComponent,
    NoteFormComponent,
    FolderListComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MentionModule,
    FormsModule
  ],
  exports: [
    NoteComponent,
    NoteFormComponent,
    FolderListComponent,
    NewsComponent
  ]
})
export class NoteModule { }
