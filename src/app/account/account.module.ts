import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({ 
  imports: [CommonModule, SharedModule, AccountRoutingModule, ReactiveFormsModule],
  declarations: [LoginComponent, RegisterComponent],
})
export class AccountModule {}
