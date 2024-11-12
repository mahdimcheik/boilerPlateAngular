import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletNavbarComponent } from './outlet-navbar.component';

describe('OutletNavbarComponent', () => {
  let component: OutletNavbarComponent;
  let fixture: ComponentFixture<OutletNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutletNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
