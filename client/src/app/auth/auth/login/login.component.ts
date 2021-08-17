import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from '../../auth-store.service';
import { UiService, Colors } from '../../../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  credentials: {
    email: string;
    password: string;
  };

  constructor(
    private authStore: AuthStoreService,
    private ui: UiService
  ) { }
  ngOnInit() {
    this.credentials = {
      email: null,
      password: null
    };
  }

  onSubmit() {
    this.authStore.login(this.credentials.email, this.credentials.password)
      .subscribe(val => {
        if (val.data.login.success) {
          this.ui.presentToast(val.data.login.success.message, Colors.success);
        } else {
          this.ui.presentToast(val.data.login.errors.message, Colors.danger);
        }
      });
  }
}
