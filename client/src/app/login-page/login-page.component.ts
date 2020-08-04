import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { UnsubscribeComponent } from '../unsubscriber/unsubscribe.component';
import { MaterializeService } from '../shared/classes/materialize.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends UnsubscribeComponent implements OnInit {

  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      let message = '';

      if (params['registered']) {
        message = 'You are already registered and can log in';
      } else if (params['accessDenied']) {
        message = 'Log in first';
      }

      MaterializeService.toast(message);
    });
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const { login, password } = this.form.value;
    const user = new User(login, password);

    this.form.disable();

    this.subscriptions.push(
      this.authService.login(user).subscribe(
        () => {
          this.router.navigate(['/overview']).then(() => {});
        },
        () => {
          this.form.enable();
        }
      )
    );
  }
}
