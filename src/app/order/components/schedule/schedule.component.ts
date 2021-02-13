import { Component, OnInit,AfterViewInit,ViewChild,Input ,EventEmitter , Output , OnChanges} from '@angular/core';
import { IScheduleData , IDateTime} from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit , AfterViewInit , OnChanges {
  @Output() scheduleAdded = new EventEmitter<IScheduleData>()

  @Input() index:number = 1;
  @Input() dateTimes:IDateTime = {
    year: 2021,
    day: 'Wednesday',
    date: 3,
    month: 'Jun'
  }
  @Input() informationShedule:IScheduleData = {
    from: 0,
    to: 1,
    available:true,
    hourlyRate: 25,
    totalHours: 1,
    repeatWeekly: 2,
    total: '25.00',
    finished: false ,
    deliveryOff : 10,
    date: this.dateTimes
  }

  @ViewChild('controlLeft') c_left:any;
  @ViewChild('controlRight') c_right:any;
  @ViewChild('range') range:any;
  @ViewChild('rangeEnd') range_end:any;

  
  
  scalableSize:number = 4.75;

  constructor() {

  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit():void{
    this.setRangeEnd();
    this.setGraphic();
  }
  ngOnChanges():void{
    this.informationShedule = {
      ...this.informationShedule ,
      date:this.dateTimes 
    }
  }
  setRangeEnd():void{
    const range_end:HTMLDivElement = this.range_end.nativeElement;
    range_end.style.left = `${this.scalableSize*(this.informationShedule.deliveryOff*2)}%`
  }
  setInputValue(input:HTMLInputElement , value:number):void{
    input.value = `${value*2}`;
  }
  setGraphic():void{
    const range:any = this.range.nativeElement;

    

    const parent:any = range.parentNode.parentNode.parentNode.children;
    const input_right:HTMLInputElement = parent[4];
    const input_left:HTMLInputElement = parent[3];

    this.setInputValue(input_left , this.informationShedule.from);
    this.setInputValue(input_right , this.informationShedule.to);

    if(this.c_left){
      const c_left:HTMLDivElement = this.c_left.nativeElement;
      const c_right:HTMLDivElement = this.c_right.nativeElement;

      c_left.style.left = `${this.scalableSize * Number(input_left.value)}%`;
      c_right.style.left = `${this.scalableSize * Number(input_right.value)}%`;
    }
    

    range.style.left = `${this.scalableSize * Number(input_left.value)}%`;
    range.style.width = `${this.scalableSize*( Number(input_right.value) - Number(input_left.value))}%`;
  }


  //funcionalidad

  control(e:any , direction:'left'|'right'):void{
    const element:HTMLInputElement = e.target ;
    const parent:HTMLCollection = element.parentNode? element.parentNode.children : element.children;
    console.log(element.value);
    //hallando los dos inputs
    
    const c_left:HTMLDivElement = this.c_left.nativeElement;
    const c_right:HTMLDivElement = this.c_right.nativeElement;
    const range:HTMLDivElement = this.range.nativeElement;
    const input_right:any = parent[4];
    const input_left:any = parent[3];

    if(direction === 'left'){
      
      const limit : number = input_right.value;

      if(Number(element.value) >= limit){
        element.value = `${Number(limit) - 1}`;
      }

      this.informationShedule = {
        ...this.informationShedule,
        from: Number(element.value)/2,
        totalHours:this.calculateTotal(limit , Number(element.value) )
      }

      this.setTotalMount();
      c_left.style.left = `${this.scalableSize * Number(element.value)}%`;
      range.style.left = `${this.scalableSize * Number(element.value)}%`;

    }else{
      
      const limit : number = Number(input_left.value);
      if(Number(element.value) <= limit){
        element.value = `${limit + 1}`;
      }
      if(Number(element.value) >= this.informationShedule.deliveryOff*2){
        element.value = `${this.informationShedule.deliveryOff*2}`;
      }
      this.informationShedule = {
        ...this.informationShedule,
        to: Number(element.value)/2,
        totalHours:this.calculateTotal(Number(element.value) , limit )
      }
      this.setTotalMount();
      c_right.style.left = `${this.scalableSize * Number(element.value)}%`;
      
    }

    range.style.width = `${this.scalableSize*(Number(input_right.value) - Number(input_left.value))}%`;
    console.log(element.value);
  }
  beforeControl(direction:'left'|'right'):void{
    const c_left:any = this.c_left.nativeElement;
    const childs:NodeListOf<HTMLInputElement> = c_left.parentNode.parentNode.children;
    
    const i_left:HTMLInputElement = childs[3];
    const i_right:HTMLInputElement = childs[4];
    if(direction === "left"){
      i_left.style.display = "inline";
      i_right.style.display = "none";
    }else{
      i_left.style.display = "none";
      i_right.style.display = "inline";
    }
  }
  resetInput(e:any):void{
    const element:HTMLInputElement = e.target;
    element.style.display= "none";
  }
  setTotalMount():void{
    const total:string = ((this.informationShedule.hourlyRate*this.informationShedule.totalHours)-(this.informationShedule.repeatWeekly*this.informationShedule.totalHours)).toFixed(2);
    this.informationShedule.total = total;
  }
  addSchedule():void{
    this.scheduleAdded.emit(this.informationShedule);
  }
  //Computed
  getNumber(from:boolean):string{
    if(from){
      const fromN:number = Number(this.informationShedule.from.toFixed(2));
      const decimales:number = (fromN - Math.trunc(fromN)) * 10;
      const rest = decimales === 5? 2 : 0;
      if(fromN < 1){
        
        return `12:${decimales - rest}0`;
      }
      return `${Math.trunc(fromN)}:${decimales - rest}0`;
    }
    const toN:number = Number(this.informationShedule.to.toFixed(2));
    const decimales:number = (toN - Math.trunc(toN)) * 10;
    const rest = decimales === 5? 2 : 0;
    if(toN < 1){
      return `12:${decimales - rest}0`;
    }
    return `${Math.trunc(toN)}:${decimales - rest}0`;
  }
  calculateTotal(to:number , from:number):number{

    return (to - from)/2;
  }
  isValidOrder():boolean{
    const valid = this.informationShedule.available;
    const totalHours = this.informationShedule.totalHours;
    if(valid && totalHours >= 2){
      return true;
    }
    return false;
  }

}
