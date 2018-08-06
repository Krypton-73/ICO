import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VerifyotpComponent } from './auth/verifyotp/verifyotp.component';
import { RegisteredmessageComponent } from './auth/registeredmessage/registeredmessage.component';
import { AuthGuard } from './guards/auth.guard';

import { LoginauthComponent } from './auth2/loginauth/loginauth.component';
import { LoginauthforgotpasswordComponent } from './auth2/loginauthforgotpassword/loginauthforgotpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MywalletComponent } from './mywallet/mywallet.component';
import { ReferralsComponent } from './referrals/referrals.component';


const routes: Routes = [
  // phase1
  // {
  //   path: '',
  //   component: WelcomeComponent,
  //   pathMatch: 'full',
  //   data: { title: 'Welcome' }
  // },
  // {
  //   path: 'welcome',
  //   component: WelcomeComponent,
  //   data: { title: 'Welcome' }
  // },
  // {
  //   path: 'home',
  //   canActivate: [ AuthGuard ],
  //   component: HomeComponent,
  //   data: { title: 'Home' }
  // },
  // {
  //   path: 'auth/login',
  //   component: LoginComponent,
  //   data: { title: 'Log In' }
  // },
  // {
  //   path: 'auth/login/:email',
  //   component: LoginComponent,
  //   data: { title: 'Log In' }
  // },
  // {
  //   path: 'auth/signup',
  //   component: SignupComponent,
  //   data: { title: 'Sign Up' }
  // },
  // {
  //   path: 'auth/otp/:token',
  //   component: VerifyotpComponent,
  //   data: { title: 'Verify OTP' }
  // },
  // {
  //   path: 'auth/sent/:token',
  //   component: RegisteredmessageComponent,
  //   data: { title: 'Link sent' }
  // },

  // phase 2
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth'
  },
  {
    path: 'auth',
    component: LoginauthComponent,
    data: { title: 'Acex Auth' }
  },
  {
    path: 'auth/signin/:email',
    component: LoginauthComponent
  },
  {
    path: 'auth/validate-otp',
    component: VerifyotpComponent
  },
  {
    path: 'auth/forgot-password',
    component: LoginauthforgotpasswordComponent,
    data: { title: 'Acex Forgot Password'}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    data: { title: 'Acex | Dashboard'}
  },
  {
    path: 'wallet',
    component: MywalletComponent,
    canActivate: [ AuthGuard ],
    data: { title: 'Acex | My Wallet'}
  },
  {
    path: 'referral',
    component: ReferralsComponent,
    canActivate: [ AuthGuard ],
    data: { title: 'Acex | Referrals'}
  },
  {
      path: '**',
      // component: WelcomeComponent,
      pathMatch: 'full',
      redirectTo: '/auth',
      data: { title: 'Welcome' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash : true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
