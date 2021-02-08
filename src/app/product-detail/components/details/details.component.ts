import { Component, OnInit, Input} from '@angular/core';
import { IProduct } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() product:IProduct | undefined;
  dates:string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createDates();
  }
  createDates():void {
    //indispensable
    const days:string[] = ['' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday'];
    const months:string[] = ['Jan' , 'Feb' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August', 'Sep' , 'Oct' , 'Nov' , 'Dic'];
    const date:Date = new Date();
    //getters
    const nowDay:number = date.getDay();
    const nowFecha:number = date.getDate();
    const nowMonth:number = date.getMonth();
    const nowYear:number = date.getFullYear();

  
    //validations
    for(let i = 1 ; i < 5 ; i++){

      let day:number = nowDay + i;
      let fecha:number = nowFecha + i; 
      let month:number = nowMonth;
      let year:number = nowYear;

      if(day > 7){
        const residuo = day % 7;
        day = residuo;
      }
      if(fecha > 28){
        const residuo = fecha % 28;
        fecha = residuo;
        month += 1;
        if(month > 11){
          year += 1;
          month = 0;
        }
      }

      const newDate:string = `${days[day]} ${fecha} ${months[month]} ${year}`;
      this.dates.push(newDate);
    }
  }
  addToCart():void {
    
  }

}
