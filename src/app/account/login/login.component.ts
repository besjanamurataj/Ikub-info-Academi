import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { SpinnerOverlayService } from 'src/app/core/services/spinner-overlay.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { MESSAGE_INSERT_EMAIL, MESSAGE_INSERT_PASSWORD, MESSAGE_VALID_EMAIL, TITLE_LOGIN } from '../account.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
    private spinner: SpinnerOverlayService,
    private titleService: Title) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.titleService.setTitle(TITLE_LOGIN);
  }

  login(): void {

    if (this.email.hasError('required')) {
      this.toastr.error(MESSAGE_INSERT_EMAIL);
      return;
    }

    if (this.password.hasError('required')) {
      this.toastr.error(MESSAGE_INSERT_PASSWORD);
      return;
    }

    if (this.email.hasError('email')) {
      this.toastr.error(MESSAGE_VALID_EMAIL);
      return;
    }

    this.spinner.show();
    this.accountService.login(this.loginForm.value).then(_ => {
      this.router.navigate(['/home/tasks']);
    }).finally(() => {
      this.spinner.hide();
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

}
