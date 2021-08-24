import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApolloAngularSDK, FolderArgs, FoldersDocument } from '../../sdk/generated/graphql';
import { UiService, Colors } from '../../shared/ui.service';

// TODO: Handle delete caching note list
@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit {

  @Input()
  folders: any[];

  subSink: Subscription = new Subscription();

  constructor(
    public uiService: UiService,
    private apolloSdk: ApolloAngularSDK
  ) { }

  ngOnInit() { }

  onDelete(folder: any) {
    if (folder === 0) {
      return;
    }

    const deletedFolder: FolderArgs = {
      id: folder
    };

    this.subSink.add(
      this.apolloSdk.deleteFolder(
        { data: deletedFolder },
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
        }
      )
        .subscribe(({ data }) => {
          if (data.deleteFolder.success) {
            this.uiService.presentToast(data.deleteFolder.success[0].message, Colors.success);
          } else {
            this.uiService.presentToast(data.deleteFolder.success[0].message, Colors.danger);
          }
        })
    );
  }
}
