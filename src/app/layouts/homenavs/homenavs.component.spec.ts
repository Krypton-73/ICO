import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenavsComponent } from './homenavs.component';

describe('HomenavsComponent', () => {
  let component: HomenavsComponent;
  let fixture: ComponentFixture<HomenavsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomenavsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomenavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
