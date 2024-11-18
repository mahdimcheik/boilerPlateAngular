import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  EventInput,
} from '@fullcalendar/core/index.js';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import { SlotService } from '../../../../services/slot.service';
import { firstValueFrom, reduce, tap } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { SlotResponseDTO } from '../../../../shared/Models/slot';

type MinimalEvent = {
  start: Date;
  end: Date;
};
type CustomEvent = {
  start: Date;
  end: Date;
  extendedProps: {
    firstName: string;
    lastName: string;
    imgUrl: string;
  };
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, AfterViewInit {
  slotService = inject(SlotService);
  userConnected = inject(AuthService).userConnected; // signal

  isVisibleModalCreate: boolean = false;

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;
  events: EventInput[] = [{ title: 'Meeting1', start: new Date() }];
  displayModal: boolean = false;
  dateStart!: Date;
  dateEnd!: Date;
  currentDate!: Date;

  canDrop = (dropInfo: MinimalEvent, draggedEvent: any) => {
    const now = new Date();
    const booked = draggedEvent.extendedProps.booked;
    return dropInfo.start >= now && !booked;
  };
  onEventClick = (eventClickArg: EventClickArg) => {
    console.log('eventClickArg', eventClickArg);
  };
  onDrop = (eventDropArg: EventDropArg) => {
    console.log(
      'Event drop',
      eventDropArg.oldEvent.end,
      eventDropArg.oldEvent.start,
      eventDropArg.delta
    );
  };
  onDateSelect = (selectionInfo: DateSelectArg) => {
    console.log('date selected ', selectionInfo);
    this.events.push({
      title: 'new events',
      start: selectionInfo.start,
      end: selectionInfo.end,
    });
    this.showCreateModal();
    this.events = [...this.events];
  };
  canStartDrag = (selectionInfo: any) => {
    return selectionInfo.start > new Date();
  };

  loadSlot() {
    this.slotService
      .getSlotByCreator(this.userConnected().id)
      .subscribe((res) => (this.events = res));
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
    eventStartEditable: true,
    eventOverlap: false,
    weekNumbers: true,
    selectMirror: true,
    unselectAuto: true,
    selectOverlap: false,
    editable: true,
    selectable: true,
    eventDurationEditable: true,
    defaultTimedEventDuration: '01:00:00',
    nowIndicator: true,
    allDayText: 'Heures',
    droppable: false,

    eventContent: this.renderEventContent, // template appoitment
    select: this.onDateSelect,
    eventClick: this.onEventClick,
    // drag and drop
    selectAllow: this.canStartDrag, // can start drag event ?
    eventAllow: this.canDrop, // can drop ?
    eventDrop: this.onDrop, // drop
    events: this.events,
  };

  showCreateModal() {
    this.isVisibleModalCreate = true;
  }
  hideCreateModal() {
    this.isVisibleModalCreate = false;
  }

  async ngOnInit(): Promise<void> {
    this.loadSlot();
  }

  ngAfterViewInit(): void {
    const calendarApi = this.calendarComponent.getApi();
    this.dateStart = calendarApi.view.currentStart;
    this.dateEnd = calendarApi.view.currentEnd;
    this.currentDate = calendarApi.getDate();
    // setTimeout(() => {
    //   this.today = signal('today');
    // }, 10);
  }
  // manually add buttons controlling the calendar
  updateViewDates() {
    const calendarApi = this.calendarComponent.getApi();
    this.dateStart = calendarApi.view.currentStart;
    this.dateEnd = calendarApi.view.currentEnd;
    this.currentDate = calendarApi.getDate();
    // this.loadSlots();
    // setTimeout(() => {
    //   this.today = signal('today');
    // }, 10);
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
