import { Component, OnInit } from '@angular/core';
import { NotificationApp } from '../../../../shared/Models/notification';

@Component({
  selector: 'app-notifications-carousel',
  templateUrl: './notifications-carousel.component.html',
  styleUrl: './notifications-carousel.component.scss',
})
export class NotificationsCarouselComponent implements OnInit {
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  notifications: NotificationApp[] = [
    {
      id: '1',
      title: 'Nouvelle notification',
      description: 'Vous avez reçu une nouvelle notification',
      date: new Date(),
    },
    {
      id: '2',
      title: 'Nouvelle notification',
      description: 'Vous avez reçu une nouvelle notification',
      date: new Date(),
    },
    {
      id: '3',
      title: 'Nouvelle notification',
      description: 'Vous avez reçu une nouvelle notification',
      date: new Date(),
    },
    {
      id: '4',
      title: 'Nouvelle notification',
      description: 'Vous avez reçu une nouvelle notification',
      date: new Date(),
    },
    {
      id: '5',
      title: 'Nouvelle notification',
      description: 'Vous avez reçu une nouvelle notification',
      date: new Date(),
    },
    {
      id: '6',
      title: 'Nouvelle notification',
      description: 'Vous avez reçu une nouvelle notification',
      date: new Date(),
    },
  ];
  ngOnInit(): void {
    console.log(' test', this.notifications);
  }

  onLazyLoad(event: any) {
    console.log(event);
  }
}
