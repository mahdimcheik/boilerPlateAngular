import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditFormationComponent } from './modal-edit-formation.component';

describe('ModalEditFormationComponent', () => {
  let component: ModalEditFormationComponent;
  let fixture: ComponentFixture<ModalEditFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditFormationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
