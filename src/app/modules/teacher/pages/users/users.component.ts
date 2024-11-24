import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService, PageEvent } from '../../../../services/auth.service';
import { UserResponseDTO } from '../../../../shared/Models/user/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  authService = inject(AuthService);
  users: UserResponseDTO[] = [];
  first = 0;
  rows = 10;
  totalCount = 10;
  ngOnInit(): void {
    this.authService.getUsers(this.first, this.rows).subscribe((x) => {
      this.totalCount = x.data.totalCount;
      this.users = x.data.users;
    });
  }

  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.authService.getUsers(this.first, this.rows).subscribe((x) => {
      this.totalCount = x.data.totalCount;
      this.users = x.data.users;
    });
  }
}
