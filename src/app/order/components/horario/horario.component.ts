import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { IControlSchedule, IDateTime } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {
  //comunicacion con el padre
  @Output() selectDate = new EventEmitter<IDateTime>();


  //UI
  selectedProvision:HTMLElement | undefined;
  makeSchedule:{days:( string | number)[]}[] = [];

  //datos
  date:Date = new Date();
  currentSchedule:IControlSchedule;

  
  constructor() { 
    const months:string[] = ['Jan' , 'Feb' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August', 'Sep' , 'Oct' , 'Nov' , 'Dic'];
    const datesMonth:number[] = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];

    const dayMont:number = new Date(this.date.getFullYear() , this.date.getMonth() , 1).getDay();
    this.currentSchedule = {
      month : this.date.getMonth(),
      day: dayMont,
      dates: datesMonth[this.date.getMonth()],
      fullMonth: months[this.date.getMonth()]
    }

    //make
    this.makeScheduleF();
  }
  makeScheduleF():void{
    //restablecer
    this.makeSchedule = [];
    //logica
    let day = 0;
    const fullDays = this.currentSchedule.dates;
    for(let i = 0 ; i < 6; i++ ){
      if(i === 0){
        const espacios:string[] = new Array(this.currentSchedule.day);
        espacios.fill('');

        let numbers:number[] = new Array(7 - this.currentSchedule.day);
        numbers.fill(0);
        numbers = numbers.map(num => ++day);

        this.makeSchedule[this.makeSchedule.length] = {
          days: [...espacios, ...numbers ]
        } 
        continue;
      }else if(fullDays - day <= 7 ){
        const espacios:string[] = new Array(7 - (fullDays - day));
        espacios.fill('');

        let numbers:number[] = new Array(7 - (7 - (fullDays - day)));
        numbers.fill(0);
        numbers = numbers.map(num => ++day);

        this.makeSchedule[this.makeSchedule.length] = {
          days: [ ...numbers , ...espacios]
        } 
        break;
      }
      let numbers:number[] = new Array(7);
        numbers.fill(0);
        numbers = numbers.map(num => ++day);

      this.makeSchedule[this.makeSchedule.length] = {
        days: [...numbers ]
      } 
    }
  }

  ngOnInit(): void {
  }

  setSchedule(month:number ):void{
    const months:string[] = ['Jan' , 'Feb' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August', 'Sep' , 'Oct' , 'Nov' , 'Dic'];
    const datesMonth:number[] = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];

    const day : number = new Date(this.date.getFullYear() , month , 1).getDay();
    this.currentSchedule = {
      month : month,
      day: day,
      dates: datesMonth[month],
      fullMonth: months[month]
    }
    this.makeScheduleF();
  }
  selectedDate(e:any):void | null{
    const element : HTMLElement = e.target;
    if(element.innerText === ""){
      return;
    }
    if(this.selectedProvision){
      this.selectedProvision.className = "horario-body-dates__file cursor-pointer";
    }

    element.className = "horario-body-dates__file horario-body-dates--active";

    this.selectedProvision = element;

    //event emit

    const dateTime:IDateTime = {
      year: this.date.getFullYear(),
      month: this.currentSchedule.fullMonth,
      date: Number(element.innerText),
      day: this.getDay(Number(element.innerText)) || 'Sunday',
    }
    this.selectDate.emit(dateTime);

  }
  toggleMonth(direction: 'rigth' | 'left'):void{

    if(direction === "left" && this.currentSchedule.month !== this.date.getMonth()){
      this.setSchedule(this.currentSchedule.month - 1 );
    }else if(direction === "rigth" && this.currentSchedule.month !== 11){
      this.setSchedule(this.currentSchedule.month + 1 );
    }
  }
  getDay(date:number):string{
    const days:string[] = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thrusday' , 'Friday' , 'Saturday'];
    const firstDayMonth:number = this.currentSchedule.day;
    const day:number = (date%7)+(firstDayMonth - 1);
    
    return days[day];
  }
}
