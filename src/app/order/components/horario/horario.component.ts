import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnChanges,
} from '@angular/core';

import { IControlSchedule, IDateTime } from '@core/models/interfaces';

import { months, datesMonth } from '@core/utils/dateUtils';
import { getDays } from '@core/utils/times.util';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
})
export class HorarioComponent implements OnInit, OnChanges {
  //informations
  @Input() setDatesUser: IDateTime[] = [];
  @Input() cambios: number = 0;
  @ViewChild('dates') dateElement: any;

  //comunicacion con el padre
  @Output() selectDate = new EventEmitter<IDateTime>();

  //UI
  selectedProvision: HTMLElement | undefined;
  makeSchedule: { days: (string | number)[] }[] = [];

  //datos
  date: Date = new Date();
  currentSchedule: IControlSchedule;

  constructor() {
    const dayMont: number = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1
    ).getDay();
    this.currentSchedule = {
      month: this.date.getMonth(),
      day: dayMont,
      dates: datesMonth[this.date.getMonth()],
      fullMonth: months[this.date.getMonth()],
    };

    //make
    this.makeScheduleF();
  }

  // Crea el schedule e lo inserta al schedule
  makeScheduleF(): void {
    //restablecer
    this.makeSchedule = [];
    //logica
    let day = 0;
    const fullDays = this.currentSchedule.dates;
    for (let i = 0; i < 6; i++) {
      if (i === 0) {
        const espacios: string[] = new Array(this.currentSchedule.day);
        espacios.fill('');

        let numbers: number[] = new Array(7 - this.currentSchedule.day);
        numbers.fill(0);
        numbers = numbers.map((num) => ++day);

        this.makeSchedule[this.makeSchedule.length] = {
          days: [...espacios, ...numbers],
        };
        continue;
      } else if (fullDays - day <= 7) {
        const espacios: string[] = new Array(7 - (fullDays - day));
        espacios.fill('');

        let numbers: number[] = new Array(7 - (7 - (fullDays - day)));
        numbers.fill(0);
        numbers = numbers.map((num) => ++day);

        this.makeSchedule[this.makeSchedule.length] = {
          days: [...numbers, ...espacios],
        };
        break;
      }
      let numbers: number[] = new Array(7);
      numbers.fill(0);
      numbers = numbers.map((num) => ++day);

      this.makeSchedule[this.makeSchedule.length] = {
        days: [...numbers],
      };
    }
    setTimeout(() => {
      this.setDateUser(this.currentSchedule.month);
    }, 60);
  }
  ngOnInit(): void {}
  ngOnChanges(): void {
    setTimeout(() => {
      this.setSchedule(this.currentSchedule.month);
      console.log('updated', this.currentSchedule.month);
    }, 30);
  }

  setDateUser(month: number): void {
    const dateElement: any = this.dateElement.nativeElement;
    const childrens: HTMLElement[] = dateElement.children;

    //select date paint

    const getDate: number[] = this.setDatesUser
      .filter((e) => months.indexOf(e.month) === month)
      .map((e) => e.date);
    for (let childParent of childrens) {
      const childrenParent: any = childParent.children;
      for (let child of childrenParent) {
        const date: number = Number(child.innerText);
        getDate.forEach((e) => {
          if (e === date) {
            this.selectedProvision = undefined;
            child.className =
              'horario-body-dates__file horario-body-dates--active';
          }
        });
      }
    }
  }

  // Setea el horario
  setSchedule(month: number): void {
    const day: number = new Date(this.date.getFullYear(), month, 1).getDay();
    this.currentSchedule = {
      month: month,
      day: day,
      dates: datesMonth[month],
      fullMonth: months[month],
    };
    this.makeScheduleF();
  }
  selectedDate(e: any): void | null {
    const element: HTMLElement = e.target;
    let cancel = false;
    if (element.innerText === '') {
      return;
    }

    this.setDatesUser.forEach((dateUser) => {
      if (dateUser.date === Number(element.innerText)) {
        cancel = true;
      }
    });
    if (
      this.date.getMonth() === this.currentSchedule.month &&
      Number(element.innerText) <= this.date.getDate()
    ) {
      cancel = true;
    }
    if (cancel) {
      return;
    }

    //funcionalidad

    if (this.selectedProvision) {
      this.selectedProvision.className =
        'horario-body-dates__file cursor-pointer';
    }

    element.className = 'horario-body-dates__file horario-body-dates--active';

    this.selectedProvision = element;

    //event emit

    const dateTime: IDateTime = {
      year: this.date.getFullYear(),
      month: this.currentSchedule.fullMonth,
      date: Number(element.innerText),
      day: this.getDay(Number(element.innerText)) || 'Sunday',
    };
    this.selectDate.emit(dateTime);
  }

  // Cambia de mes dependiendo la dirección
  toggleMonth(direction: 'rigth' | 'left'): void {
    if (
      direction === 'left' &&
      this.currentSchedule.month !== this.date.getMonth()
    ) {
      this.setSchedule(this.currentSchedule.month - 1);
    } else if (direction === 'rigth' && this.currentSchedule.month !== 11) {
      this.setSchedule(this.currentSchedule.month + 1);
    }
  }

  // Obtiene el día
  getDay(date: number): string {
    const days: string[] = getDays();
    const firstDayMonth: number = this.currentSchedule.day;
    const day: number = (date % 7) + (firstDayMonth - 1);

    return days[day];
  }
}
