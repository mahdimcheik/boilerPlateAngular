import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBinaryDataComponent } from './line-binary-data.component';

describe('LineBinaryDataComponent', () => {
  let component: LineBinaryDataComponent;
  let fixture: ComponentFixture<LineBinaryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineBinaryDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineBinaryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
