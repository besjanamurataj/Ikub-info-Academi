import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CredentialInfo } from 'src/app/core/models/credential-info';
import { AccountService } from 'src/app/core/services/account.service';
import { SpinnerOverlayService } from 'src/app/core/services/spinner-overlay.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { MESSAGE_CONFIRM_PASSWORD, MESSAGE_INSERT_EMAIL, MESSAGE_INSERT_PASSWORD, MESSAGE_MATCH_PASSWORD, MESSAGE_SUCCESS_REGISTER, MESSAGE_VALID_EMAIL, TITLE_REGISTER } from '../account.constants';
import { passwordConfirmValidator } from '../password-confirm.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
    private spinner: SpinnerOverlayService,
    private titleService: Title) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validators: passwordConfirmValidator
    });
    this.titleService.setTitle(TITLE_REGISTER);
  }

  register(): void {
    if (this.email.hasError('required')) {
      this.toastr.error(MESSAGE_INSERT_EMAIL);
      return;
    }


    if (this.password.hasError('required')) {
      this.toastr.error(MESSAGE_INSERT_PASSWORD);
      return;
    }

    if (this.repeatPassword.hasError('required')) {
      this.toastr.error(MESSAGE_CONFIRM_PASSWORD);
      return;
    }

    if (this.email.hasError('email')) {
      this.toastr.error(MESSAGE_VALID_EMAIL);
      return;
    }

    if (this.registerForm.hasError('passwordConfirm')) {
      this.toastr.error(MESSAGE_MATCH_PASSWORD);
      return;
    }

    const request: CredentialInfo = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.spinner.show();
    this.accountService.register(request).then(() => {
      this.router.navigate(['../']);
      this.toastr.success(MESSAGE_SUCCESS_REGISTER);
    }).finally(() => this.spinner.hide());
  }


  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.registerForm.get('repeatPassword') as FormControl;
  }



}
