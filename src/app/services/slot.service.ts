import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { ResponseDTO } from '../shared/Models/user/user';
import { SlotCreateDTO, SlotResponseDTO } from '../shared/Models/slot';
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
          console.log('results events ', res);
          var slots = res.data as SlotResponseDTO[];
          if (slots == null || slots.length == 0) return [];
          return slots.map((slot) => {
            return {
              start: new Date(slot.startAt),
              end: new Date(slot.endAt),
              title: 'No title',
              extendedProps: {
                price: slot.price,
                reduction: slot.reduction,
              },
            } as EventInput;
          });
        }),
        tap((res) => this.visibleEvents.set(res))
      );
  }

  addSlotByCreator(slotCreateDTO: SlotCreateDTO): Observable<ResponseDTO> {
    return this.http
      .post<ResponseDTO>(`https://localhost:7113/slot`, slotCreateDTO)
      .pipe(
        tap((res) => {
          console.log('result after add appt', res);

          this.visibleEvents().push(
            this.convertSlotResponseToEventInput(res.data)
          );
          this.visibleEvents.set([...this.visibleEvents()]);
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
      },
    };
  }
}
