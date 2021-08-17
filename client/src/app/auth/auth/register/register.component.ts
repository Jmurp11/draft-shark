import { Component, OnInit } from '@angular/core';
import { UiService, Colors } from 'src/app/shared/ui.service';
import { AuthStoreService } from '../../auth-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  credentials: {
    email: string;
    username: string;
    password: string;
    profileImage: string;
  };

  constructor(
    private authStore: AuthStoreService,
    private ui: UiService) { }

  ngOnInit() {
    this.credentials = {
      email: null,
      username: null,
      password: null,
      profileImage: null,
    };
  }

  onSubmit() {
    this.authStore.register(
      this.credentials.email,
      this.credentials.password,
      this.credentials.username,
      this.credentials.profileImage
    ).subscribe(val => {
      console.log(val.data);
      if (val.data.register.success) {
        this.ui.presentToast(val.data.login.success.message, Colors.success);
      } else {
        this.ui.presentToast(val.data.login.errors.message, Colors.danger);
      }
    });
  }

}
