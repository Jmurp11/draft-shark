import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApolloAngularSDK, PlayerArgs } from '../../sdk/generated/graphql';
import { MentionConfig } from '../mention';

interface Note {
  title: string;
  folder: any;
  body: string;
  references: any;
}

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit, OnDestroy {

  folders: any[] = [];
  subSink: Subscription = new Subscription();
  mentionConfig: MentionConfig;
  references: number[];
  note: Note;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.note = {
      title: null,
      folder: null,
      body: null,
      references: []
    };

    this.mentionConfig = {
      mentions: []
    };

    this.subSink.add(
      this.getFolders()
        .subscribe(({ data }) => {
          this.folders = data.folders;
        })
    );



    this.subSink.add(
      this.getPlayers().subscribe(({ data }) => {
        this.mentionConfig = {
          mentions: [
            {
              items: data.players,
              triggerChar: '@',
              labelKey: 'name',
              maxItems: 10,
              allowSpace: true,
              mentionSelect: this.mentionSelect
            }
          ]
        };
      })
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  onSave() {
    this.dismiss(this.note);
  }

  onCancel() {
    this.dismiss(null);
  }

  updateReferences = (selection: any): void => {
    const ref = {
      player: selection.id
    };

    this.note.references.push(ref);
  };

  mentionSelect = (selection: any): string => {
    this.updateReferences(selection);
    return `${selection.name}`;
  };

  private dismiss(createNote: Note) {
    this.modalController.dismiss({
      dismissed: true,
      data: createNote ? createNote : null
    });
  }

  private getPlayers() {
    const playersInput: PlayerArgs = {
      filterType: 'byNotStatus',
      status: 'Inactive',
      take: 450,
      skip: 0
    };

    return this.apolloSdk.playersWatch({
      data: playersInput
    })
      .valueChanges;
  }

  private getFolders() {
    return this.apolloSdk.foldersWatch(
      {
        data: {
          filterType: 'byCurrentUser'
        }
      })
      .valueChanges;
  }
}
