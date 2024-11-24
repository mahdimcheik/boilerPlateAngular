import { Component, inject, ViewChild } from '@angular/core';
import { SlotService } from '../../../../services/slot.service';
import { AuthService } from '../../../../services/auth.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  EventInput,
} from '@fullcalendar/core/index.js';
import { EventResizeDoneArg } from '@fullcalendar/interaction/index.js';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-calendar-for-reservation',
  templateUrl: './calendar-for-reservation.component.html',
  styleUrl: './calendar-for-reservation.component.scss',
})
export class CalendarForReservationComponent {
  slotService = inject(SlotService);
  visibleEvents = this.slotService.visibleEvents; // signal

  isVisibleModalBookingDelete: boolean = false;

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;
  events: EventInput[] = [];
  displayModal: boolean = false;
  dateStart!: string;
  dateEnd!: string;
  currentDate!: Date;
  selectedSlot: EventInput = { start: new Date(), end: new Date() }; // empty slot selected pas un appoitment
  selectedAppoitment: EventInput = { start: new Date(), end: new Date() }; // evenement déjà créé

  onEventClick = (eventClickArg: EventClickArg) => {
    this.selectedAppoitment = eventClickArg.event as EventInput;
    this.isVisibleModalBookingDelete = true;
    console.log('event click', eventClickArg);
  };

  loadSlot() {
    this.slotService
      .getSlotByCreator(environment.TEACHER_ID, this.dateStart, this.dateEnd)
      .subscribe();
  }

  // template slot
  renderEventContent = (arg: EventContentArg) => {
    let html = `<div class="custom-event">
                    <b>${arg.event.title}</b>
                    <div>${
                      arg.event.extendedProps['booked']
                        ? `<div class="slot-content"><img src=${
                            (arg.event.extendedProps as any).imgUrl
                          } width="24" height="24"/><span>${
                            (arg.event.extendedProps as any).firstName
                          } ${
                            (arg.event.extendedProps as any).lastName
                          }</span></div>
                        <div class="sujet">Sujet : ${
                          (arg.event.extendedProps as any).subject
                        }</div>

                        `
                        : `Créneau disponible <div>Prix :${
                            (arg.event.extendedProps as any).price
                          }</div>`
                    }</div>
                  </div>`;
    let arrayOfDomNodes = [];
    let div = document.createElement('div');
    div.innerHTML = html;
    arrayOfDomNodes.push(div.firstChild);
    return { domNodes: arrayOfDomNodes };
  };

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    locale: frLocale,
    headerToolbar: {
      right: '',
      left: '',
      center: '',
    },
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
      },
      timeGridFiveDays: {
        type: 'timeGrid',
        duration: { days: 4 },
      },

      validRange: {
        start: '2024-05-24',
      },
    },
    weekends: true,
    slotDuration: '00:15:00',
    slotMinTime: '09:00',
    slotMaxTime: '22:00',
    allDaySlot: false,
    navLinks: true,
    eventOverlap: false,
    weekNumbers: true,
    selectMirror: true,
    unselectAuto: true,
    selectOverlap: false,
    eventDurationEditable: true,
    defaultTimedEventDuration: '01:00:00',
    nowIndicator: true,
    allDayText: 'Heures',
    droppable: false,

    eventContent: this.renderEventContent, // template appoitment
    eventClick: this.onEventClick,
    events: this.events,
  };

  async ngOnInit(): Promise<void> {}

  ngAfterViewInit(): void {
    const calendarApi = this.calendarComponent.getApi();
    this.dateStart = calendarApi.view.currentStart.toUTCString();
    this.dateEnd = calendarApi.view.currentEnd.toUTCString();
    this.currentDate = calendarApi.getDate();
    this.loadSlot();
  }
  // manually add buttons controlling the calendar
  updateViewDates() {
    const calendarApi = this.calendarComponent.getApi();
    this.dateStart = calendarApi.view.currentStart.toUTCString();
    this.dateEnd = calendarApi.view.currentEnd.toUTCString();
    this.currentDate = calendarApi.getDate();
  }

  next(): void {
    this.calendarComponent.getApi().next();
    this.updateViewDates();
  }
  prev(): void {
    this.calendarComponent.getApi().prev();
    this.updateViewDates();
  }
  getToday(): void {
    this.calendarComponent.getApi().today();
    this.updateViewDates();
  }
  weekView() {
    this.calendarComponent.getApi().changeView('timeGridWeek');
    this.updateViewDates();
  }
  monthView() {
    this.calendarComponent.getApi().changeView('dayGridMonth');
    this.updateViewDates();
  }
  dayView() {
    this.calendarComponent.getApi().changeView('timeGridDay');
    this.updateViewDates();
  }
}
