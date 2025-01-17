import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsCarouselComponent } from './notifications-carousel.component';

describe('NotificationsCarouselComponent', () => {
  let component: NotificationsCarouselComponent;
  let fixture: ComponentFixture<NotificationsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
