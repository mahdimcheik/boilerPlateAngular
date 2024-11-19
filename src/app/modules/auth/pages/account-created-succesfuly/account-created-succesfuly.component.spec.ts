import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreatedSuccesfulyComponent } from './account-created-succesfuly.component';

describe('AccountCreatedSuccesfulyComponent', () => {
  let component: AccountCreatedSuccesfulyComponent;
  let fixture: ComponentFixture<AccountCreatedSuccesfulyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountCreatedSuccesfulyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCreatedSuccesfulyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
