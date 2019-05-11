import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';






@NgModule({
  imports: [
        BrowserModule,
    FormsModule,
    AngularFireAuthModule,
    CommonModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: []
})
export class AuthModule { }
