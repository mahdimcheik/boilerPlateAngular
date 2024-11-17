import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateAppoitmentComponent } from './modal-create-appoitment.component';

describe('ModalCreateAppoitmentComponent', () => {
  let component: ModalCreateAppoitmentComponent;
  let fixture: ComponentFixture<ModalCreateAppoitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateAppoitmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateAppoitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
