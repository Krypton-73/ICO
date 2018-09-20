import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {VerifyotpComponent} from './auth/verifyotp/verifyotp.component';
import {AuthGuard} from './guards/auth.guard';

import {LoginauthComponent} from './auth2/loginauth/loginauth.component';
import {LoginauthforgotpasswordComponent} from './auth2/loginauthforgotpassword/loginauthforgotpassword.component';
import {VerifyEmailComponent} from './auth2/verify-email/verify-email.component';
import {ResetPasswordComponent} from './auth2/reset-password/reset-password.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MywalletComponent} from './mywallet/mywallet.component';
import {ReferralsComponent} from './referrals/referrals.component';
import {LoggedIn} from './guards/logged-in';
import {MaintenanceGuard} from './guards/maintenance.guard';
import {SettingsComponent} from './settings/settings.component';
import {MaintenanceComponent} from './layouts/maintenance/maintenance.component';


const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/maintenance'
    },
    {
        path: 'auth',
        component: LoginauthComponent,
        data: {title: 'AceX | Auth'},
        canActivate: [ MaintenanceGuard ]
    },
    {
        path: 'auth/signin/:email',
        component: LoginauthComponent,
        data: {title: 'AceX | Auth'},
        canActivate: [ LoggedIn ]
    },
    {
        path: 'auth/validate-otp',
        component: VerifyotpComponent,
        data: {title: 'AceX | Auth'},
        canActivate: [ LoggedIn ]
    },
    {
        path: 'auth/forgot-password',
        component: LoginauthforgotpasswordComponent,
        data: {title: 'AceX | Forgot Password'},
        canActivate: [ LoggedIn ]
    },
    {
        path: 'auth/referral/:refId',
        component: LoginauthComponent,
        data: {title: 'AceX | Auth'},
        canActivate: [ LoggedIn ]
    },
    {
        path: 'auth/reset-password/:email/:verCode',
        component: ResetPasswordComponent,
        data: {title: 'AceX | Reset Password'},
        canActivate: [ LoggedIn ]
    },
    {
        path: 'auth/verify-email/:email/:verCode',
        component: VerifyEmailComponent,
        data: {title: 'AceX | Verify Email'},
        canActivate: [ LoggedIn ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuard ],
        data: {title: 'AceX | Dashboard'}
    },
    {
        path: 'wallet',
        component: MywalletComponent,
        canActivate: [ AuthGuard ],
        data: {title: 'AceX | My Wallet'}
    },
    {
        path: 'referral',
        component: ReferralsComponent,
        canActivate: [ AuthGuard ],
        data: {title: 'AceX | Referrals'}
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [ AuthGuard ],
        data: {title: 'AceX | Settings'}
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/maintenance'
    },
    {
        path: 'maintenance',
        component: MaintenanceComponent,
        data: {title: 'AceX | Maintenance'}
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', useHash: true}) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
