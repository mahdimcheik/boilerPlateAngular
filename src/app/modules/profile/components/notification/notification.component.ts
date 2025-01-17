import { Component, Input, OnInit } from '@angular/core';
import { NotificationApp } from '../../../../shared/Models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  @Input() notification!: NotificationApp;
  ngOnInit(): void {
    console.log(' test', this.notification);
  }
}
