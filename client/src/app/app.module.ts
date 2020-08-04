import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layout/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UnsubscribeComponent } from './unsubscriber/unsubscribe.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { CatchErrorInterceptor } from './shared/classes/catch-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    UnsubscribeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: CatchErrorInterceptor
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
