import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditAdresseComponent } from './modal-edit-adresse.component';

describe('ModalEditAdresseComponent', () => {
  let component: ModalEditAdresseComponent;
  let fixture: ComponentFixture<ModalEditAdresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditAdresseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
