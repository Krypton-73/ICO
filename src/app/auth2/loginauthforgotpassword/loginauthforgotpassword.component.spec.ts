import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginauthforgotpasswordComponent } from './loginauthforgotpassword.component';

describe('LoginauthforgotpasswordComponent', () => {
  let component: LoginauthforgotpasswordComponent;
  let fixture: ComponentFixture<LoginauthforgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginauthforgotpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginauthforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
