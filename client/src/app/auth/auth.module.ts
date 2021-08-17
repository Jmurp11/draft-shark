import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { IonicModule } from '@ionic/angular';
import { AuthStoreService } from './auth-store.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    AuthRoutingModule,
    IonicModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    AuthStoreService
  ]
})
export class AuthModule { }
