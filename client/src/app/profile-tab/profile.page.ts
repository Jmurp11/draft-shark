import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthStoreService } from '../auth/auth-store.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  subSink: Subscription = new Subscription();
  user: User;

  constructor(private authStore: AuthStoreService) { }

  ngOnInit() {
    this.subSink.add(
      this.authStore.stateChanged
        .pipe(
          switchMap(() => this.authStore.getCurrentUser())
        ).subscribe(user => this.user = user));
  }

  signOut() {
    this.authStore.logout();
  }
}
