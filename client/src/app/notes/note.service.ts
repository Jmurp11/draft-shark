import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createNote, userNotes, publicNotes, deleteNote } from './queries';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface NoteResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteStatus = new BehaviorSubject<NoteResponse>(null);
  deleteStatus = new BehaviorSubject<NoteResponse>(null);
  hasNotes = new BehaviorSubject<boolean>(null);
  clearNoteForm = new BehaviorSubject<boolean>(null);
  populatePlayer = new BehaviorSubject<boolean>(true);

  constructor(
    private apollo: Apollo
  ) { }

  createNote(
    user: string, player: number, title: string, body: string,
    source: string, isPrivate: boolean) {
    this.apollo.mutate({
      mutation: createNote,
      variables: {
        user,
        player,
        title,
        body,
        source,
        isPrivate
      },
      refetchQueries: [
        {
          query: userNotes,
          variables: {
            user
          }
        },
        {
          query: publicNotes
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.createNote.success) {
        const response = {
          success: false,
          message: data.createNote.errors[0].message
        };

        this.noteStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.createNote.success[0].message
        };

        this.noteStatus.next(response);
      }
    });
  }

  deleteNote(id: string, user: string) {
    this.apollo.mutate({
      mutation: deleteNote,
      variables: {
        id
      },
      refetchQueries: [
        {
          query: userNotes,
          variables: {
            user
          }
        },
        {
          query: publicNotes
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.createNote.success) {
        const response = {
          success: false,
          message: data.createNote.errors[0].message
        };

        this.noteStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.createNote.success[0].message
        };

        this.noteStatus.next(response);
      }
    });
  }

  setHasNotes(hasNotes: boolean) {
    this.hasNotes.next(hasNotes);
  }

  prepopulatePlayer(val: boolean) {
    this.populatePlayer.next(val);
  }

  resetForm(val: boolean) {
    this.clearNoteForm.next(val);
  }

  resetResponse() {
    this.noteStatus.next(null);
    this.deleteStatus.next(null);
  }
}
