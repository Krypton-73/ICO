import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2Webstorage } from 'ngx-webstorage';
import { LoadingModule } from 'ngx-loading';
import { ANIMATION_TYPES } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { QRCodeModule } from 'angularx-qrcode';
import { ClipboardModule } from 'ngx-clipboard';

import { GlobalsService } from './services/globals.service';
import { AuthService } from './services/auth.service';
import { CryptostoreService } from './services/cryptostore.service';
import { LoaderService } from './layouts/loading/loading.service';
import { KeyeventService } from './services/keyevent.service';
import { HomeService } from './services/home.service';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { NgxPhoneSelectModule } from 'ngx-phone-select';

// import { AppLoadingModule } from './layouts/loading/loading.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoadingComponent } from './layouts/loading/loading.component';
import { VerifyotpComponent } from './auth/verifyotp/verifyotp.component';
import { RegisteredmessageComponent } from './auth/registeredmessage/registeredmessage.component';
import { NavsComponent } from './layouts/navs/navs.component';
import { LoginauthComponent } from './auth2/loginauth/loginauth.component';
import { LoginauthforgotpasswordComponent } from './auth2/loginauthforgotpassword/loginauthforgotpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MywalletComponent } from './mywallet/mywallet.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { HomenavsComponent } from './layouts/homenavs/homenavs.component';
import { BuyTokensComponent } from './buy-tokens/buy-tokens.component';
import { ModalComponent } from './modal/modal.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedIn } from './guards/logged-in';
import { AuthenticationService } from './services/authenticationService';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { ResetPasswordComponent } from './auth2/reset-password/reset-password.component';
import { VerifyEmailComponent } from './auth2/verify-email/verify-email.component';
import { SettingsComponent } from './settings/settings.component';
import { MaintenanceComponent } from './layouts/maintenance/maintenance.component';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    LoadingComponent,
    VerifyotpComponent,
    RegisteredmessageComponent,
    NavsComponent,
    LoginauthComponent,
    LoginauthforgotpasswordComponent,
    DashboardComponent,
    MywalletComponent,
    ReferralsComponent,
    HomenavsComponent,
    BuyTokensComponent,
    ModalComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    SettingsComponent,
    MaintenanceComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    Ng2Webstorage,
    QRCodeModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true
    }),
    HttpClientModule,
    HighchartsChartModule,
    NgbModule.forRoot(),
    ClipboardModule,
    InternationalPhoneModule,
    NgxPhoneSelectModule,
  ],
  providers: [
    GlobalsService,
    AuthService,
    CryptostoreService,
    LoaderService,
    KeyeventService,
    HomeService,
    DialogService,
    AuthGuard,
    LoggedIn,
    AuthenticationService,
    DataService,
    UserService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
