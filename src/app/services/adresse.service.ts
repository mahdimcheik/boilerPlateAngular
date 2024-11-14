import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AdresseDTO } from '../shared/Models/adresse';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { MessageService } from 'primeng/api';
import { ResponseDTO } from '../shared/Models/user/user';

@Injectable({
  providedIn: 'root',
})
export class AdresseService {
  private http: HttpClient = inject(HttpClient);
  private localStorageService = inject(LocalstorageService);
  private messageService = inject(MessageService);

  listAddresses = signal([] as AdresseDTO[]);
  // https://localhost:7113/address/all?userId=65045c99-5874-4566-8d32-06bf1b342718
  constructor() {}

  getAllAddresses(userId: string): Observable<ResponseDTO> {
    return this.http
      .get<ResponseDTO>(`https://localhost:7113/address/all?userId=${userId}`)
      .pipe(tap((res) => this.listAddresses.set(res.data as AdresseDTO[])));
  }
}
