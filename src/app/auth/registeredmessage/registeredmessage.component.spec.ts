import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredmessageComponent } from './registeredmessage.component';

describe('RegisteredmessageComponent', () => {
  let component: RegisteredmessageComponent;
  let fixture: ComponentFixture<RegisteredmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredmessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
