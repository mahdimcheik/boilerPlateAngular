import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { ResponseDTO } from '../shared/Models/user/user';
import {
  SlotCreateDTO,
  SlotResponseDTO,
  SlotUpdateDTO,
} from '../shared/Models/slot';
import { EventInput } from '@fullcalendar/core/index.js';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  visibleEvents = signal([] as EventInput[]);
  private http = inject(HttpClient);

  constructor() {}

  getSlotByCreator(userId: string): Observable<EventInput[]> {
    return this.http
      .get<ResponseDTO>(`https://localhost:7113/slot?userId=${userId}`)
      .pipe(
        map((res) => {
          var slots = res.data as SlotResponseDTO[];
          if (slots == null || slots.length == 0) return [];
          return slots.map((slot) =>
            this.convertSlotResponseToEventInput(slot)
          );
        }),
        tap((res) => this.visibleEvents.set(res))
      );
  }

  addSlotByCreator(slotCreateDTO: SlotCreateDTO): Observable<ResponseDTO> {
    return this.http
      .post<ResponseDTO>(`https://localhost:7113/slot`, slotCreateDTO)
      .pipe(
        tap((res) => {
          this.visibleEvents().push(
            this.convertSlotResponseToEventInput(res.data)
          );
          this.visibleEvents.set([...this.visibleEvents()]);
        })
      );
  }

  updateSlotByCreator(slotUpdateDTO: SlotUpdateDTO): Observable<ResponseDTO> {
    return this.http
      .put<ResponseDTO>(`https://localhost:7113/slot`, slotUpdateDTO)
      .pipe(
        tap((res) => {
          let relatedAppointmentIndex = this.visibleEvents().findIndex(
            (x) => x.extendedProps?.['id'] == slotUpdateDTO.id
          );

          if (relatedAppointmentIndex != null) {
            this.visibleEvents()[relatedAppointmentIndex] =
              this.convertSlotResponseToEventInput(res.data);
          }

          this.visibleEvents.set([...this.visibleEvents()]);
          // this.visibleEvents.update(this.visibleEvents);
        })
      );
  }

  convertSlotResponseToEventInput(slot: SlotResponseDTO) {
    return {
      start: new Date(slot.startAt),
      end: new Date(slot.endAt),
      title: 'No title',
      extendedProps: {
        price: slot.price,
        reduction: slot.reduction,
        id: slot.id,
      },
    };
  }
}
