import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesDocument } from 'libs/shared/data-access/src/lib/sdk/generated/graphql';
import { Subscription } from 'rxjs';
import { UiService, Colors } from 'src/app/shared/ui.service';
import { ApolloAngularSDK, DeleteNoteInput, FoldersDocument } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit, OnDestroy {

  @Input()
  note: any;

  @Input()
  truncate: boolean;

  subSink: Subscription = new Subscription();

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private router: Router,
    private uiService: UiService,
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  navigateToPlayer(id: number) {
    this.router.navigate([`tabs/players/${id}`]);
  }

  // TODO: figure out correct refetch
  onDelete(note: string) {
    const deletedNote: DeleteNoteInput = {
      id: note
    };

    this.subSink.add(
      this.apolloSdk.deleteNote(
        { data: deletedNote },
        {
          refetchQueries: [
            {
              query: FoldersDocument,
              variables: {
                data: {
                  filterType: 'byCurrentUser'
                }
              }
            },
            {
              query: NotesDocument,
              variables: {
                data: {
                  filterType: 'byCurrentUser'
                }
              }
            }
          ]
        }
      )
        .subscribe(({ data }) => {
          if (data.deleteNote.success) {
            this.uiService.presentToast(data.deleteNote.success[0].message, Colors.success);
          } else {
            this.uiService.presentToast(data.deleteNote.success[0].message, Colors.danger);
          }
        })
    );
  }
}
