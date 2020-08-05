import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UnsubscribeComponent } from '../unsubscriber/unsubscribe.component';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent extends UnsubscribeComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
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
      this.authService.register(user)
        .subscribe(
          () => {
            this.router.navigate(['/login'], {
              queryParams: {
                registered: true
              }
            }).then(() =>{});
          },
          () => {
            this.form.enable();
          }
        )
    );
  }

}
