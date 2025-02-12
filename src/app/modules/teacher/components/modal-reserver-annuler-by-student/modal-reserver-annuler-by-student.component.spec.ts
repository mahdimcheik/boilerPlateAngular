import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReserverAnnulerByStudentComponent } from './modal-reserver-annuler-by-student.component';

describe('ModalReserverAnnulerByStudentComponent', () => {
  let component: ModalReserverAnnulerByStudentComponent;
  let fixture: ComponentFixture<ModalReserverAnnulerByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalReserverAnnulerByStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReserverAnnulerByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
