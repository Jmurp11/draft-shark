import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Exact, NoteInput, PlayerReferenceInput } from 'libs/shared/data-access/src/lib/sdk/generated/graphql';
import { Subscription } from 'rxjs';
import { FolderFormComponent } from '../note/folder-form/folder-form.component';
import { NoteFormComponent } from '../note/note-form/note-form.component';
import { ApolloAngularSDK, FolderArgs, FoldersDocument, NotesDocument } from '../sdk/generated/graphql';
import { ListComponent } from '../tab1/list/list.component';

export enum Colors {
  primary = 'primary',
  success = 'success',
  danger = 'danger',
  secondary = 'secondary',
  tertiary = 'tertiary',
  warning = 'warning',
  light = 'light',
  medium = 'medium',
  dark = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class UiService {

  subSink: Subscription = new Subscription();

  constructor(
    private toast: ToastController,
    private modalController: ModalController,
    private apolloSdk: ApolloAngularSDK
  ) { }

  async presentToast(header: string, color: string) {
    const toast = await this.toast.create({
      header,
      color,
      duration: 3000,
      position: 'bottom',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  async openCreateNoteModal() {
    const isModalOpen = await this.modalController.getTop();
    if (isModalOpen != null) {
      return;
    }

    const modal = await this.modalController.create({
      component: NoteFormComponent,
    });

    modal.onDidDismiss().then((createNote) => {
      const data: Exact<NoteInput> = {
        title: createNote.data.data.title,
        folder: createNote.data.data.folder,
        body: createNote.data.data.body,
        isPrivate: false
      };

      const references: Exact<PlayerReferenceInput>[] = createNote.data.data.references;

      this.subSink.add(
        this.apolloSdk.createNote(
          { data, references },
          {
            refetchQueries: [
              {
                query: NotesDocument,
                variables: {
                  data: {
                    filterType: 'byCurrentUser'
                  }
                }
              },
              {
                query: FoldersDocument,
                variables: {
                  data: {
                    filterType: 'byCurrentUser'
                  }
                }
              },
              ...this.generateRefetchQueries(references)
            ]
          })
          .subscribe(response => {
            if (response.data.createNote.success) {
              this.presentToast(response.data.createNote.success[0].message, Colors.success);
            } else {
              this.presentToast(response.data.createNote.errors[0].message, Colors.danger);
            }
          })
      );
    });

    return await modal.present();
  }

  async openCreateFolderModal() {
    const isModalOpen = await this.modalController.getTop();
    if (isModalOpen != null) {
      return;
    }

    const modal = await this.modalController.create({
      component: FolderFormComponent,
    });

    modal.onDidDismiss().then((createFolder) => {
      const data: Exact<FolderArgs> = {
        title: createFolder.data.data,
      };
      this.subSink.add(
        this.apolloSdk.createFolder(
          { data },
          {
            refetchQueries: [
              {
                query: FoldersDocument,
                variables: {
                  data: {
                    filterType: 'byCurrentUser'
                  }
                }
              }
            ]
          })
          .subscribe(response => {
            if (response.data.createFolder.success) {
              this.presentToast(response.data.createFolder.success[0].message, Colors.success);
            } else {
              this.presentToast(response.data.createFolder.errors[0].message, Colors.danger);
            }
          })
      );
    });

    return await modal.present();
  }

  async openListModal(list: any[], listType: string) {
    const isModalOpen = await this.modalController.getTop();
    if (isModalOpen != null) {
      return;
    }

    const modal = await this.modalController.create({
      component: ListComponent,
      componentProps: {
        list,
        listType
      }
    });

    modal.present();
  }

  private generateRefetchQueries(references: any[]) {
    // eslint-disable-next-line prefer-const
    let refetchQueries = [];

    references.forEach(r => {
      const refetchQuery =
      {
        query: NotesDocument,
        variables: {
          data: {
            filterType: 'byCurrentUserAndPlayer',
            player: parseInt(r.player, 10)
          }
        }
      };

      refetchQueries.push(refetchQuery);
    });

    return refetchQueries;
  }
}
