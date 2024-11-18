import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavChachaComponent } from './sidenav-chacha.component';

describe('SidenavChachaComponent', () => {
  let component: SidenavChachaComponent;
  let fixture: ComponentFixture<SidenavChachaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavChachaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavChachaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
