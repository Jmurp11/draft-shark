import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from '../graphql.module';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoteComponent } from './create-note/create-note.component';
import { CreateFolderButtonComponent } from './create-folder-button/create-folder-button.component';

@NgModule({
  declarations: [CreateNoteComponent, CreateFolderButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    FlexLayoutModule,
    FormsModule,
    GraphQLModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    CreateNoteComponent,
    CreateFolderButtonComponent,
    FlexLayoutModule,
    FormsModule,
    GraphQLModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
