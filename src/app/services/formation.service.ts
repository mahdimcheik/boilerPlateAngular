import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  FormationCreateDTO,
  FormationResponseDTO,
  FormationUpdateDTO,
} from '../shared/Models/formation';
import { Observable, tap } from 'rxjs';
import { ResponseDTO } from '../shared/Models/user/user';
@Injectable({
  providedIn: 'root',
})
export class FormationService {
  listFormations = signal([] as FormationResponseDTO[]);

  private http: HttpClient = inject(HttpClient);
  constructor() {}

  getFormations(userId: string) {
    return this.http
      .get<ResponseDTO>(`https://localhost:7113/formation/all?userId=${userId}`)
      .pipe(tap((res) => this.listFormations.set(res.data)));
  }

  addFormation(formation: FormationCreateDTO): Observable<ResponseDTO> {
    return this.http
      .post<ResponseDTO>(`https://localhost:7113/formation`, formation)
      .pipe(
        tap((res) => {
          this.listFormations().push(res.data);
          this.listFormations.update(this.listFormations);
          //this.listFormations.set([...this.listFormations(), (res.data as FormationResponseDTO)]);
        })
      );
  }

  updateFormation(formation: FormationUpdateDTO): Observable<ResponseDTO> {
    return this.http
      .put<ResponseDTO>(`https://localhost:7113/formation`, formation)
      .pipe(
        tap((res) => {
          var newFormationIndex = this.listFormations().findIndex(
            (x) => x.id == formation.id
          );
          this.listFormations()[newFormationIndex] = res.data;
          this.listFormations.update(this.listFormations);
          this.listFormations.update(this.listFormations);
          //this.listFormations.set([...this.listFormations(), (res.data as FormationResponseDTO)]);
        })
      );
  }
}
