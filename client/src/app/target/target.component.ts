import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Target } from './target.model';
import { targets } from './queries';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { TargetDialogComponent } from './target-dialog/target-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TargetService } from './target.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit, OnDestroy {
  targets$: Subscription;
  curUser$: Subscription;
  loading: boolean;
  hasTargets: boolean;
  targets: Target[];
  curUser: User;
  rounds: number[];
  displayedColumns = ['name', 'team', 'position', 'round', 'clear'];

  constructor(
    private _auth: AuthService,
    private apollo: Apollo,
    private dialog: MatDialog,
    private _target: TargetService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.rounds = [];

    this.curUser$ = this._auth.user.subscribe(user => {
      this.curUser = user;
    });

    this.targets$ = this.apollo.watchQuery<any>({
      query: targets,
      variables: {
        user: this.curUser.id
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.targets = data.targets;
        if (this.targets.length > 0) {
          this.hasTargets = true;
          this.targets.forEach((target: any) => {
            this.rounds.push(target.round);
          });
        } else {
          this.hasTargets = false;
        }
      });
  }

  addTarget() {
    const dialogRef = this.dialog.open(TargetDialogComponent, {
      width: '400px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteTarget(target: any) {
    this._target.deleteTarget(target.id);
  }

  ngOnDestroy() {
    this.targets$.unsubscribe();
  }
}