import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit , AfterViewInit {
  @ViewChild('controlLeft') c_left:any;
  @ViewChild('controlRight') c_right:any;
  @ViewChild('range') range:any;
  @ViewChild('rangeEnd') range_end:any;

  DeliveryOff:number = 8;

  constructor() {

  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit():void{
    this.setRangeEnd();
  }
  setRangeEnd():void{
    const range_end:HTMLDivElement = this.range_end.nativeElement;
    range_end.style.left = `${4.75*(this.DeliveryOff*2)}%`
  }

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
        element.value = `${limit - 1}`;
      }
      c_left.style.left = `${4.75 * Number(element.value)}%`;
      range.style.left = `${4.75 * Number(element.value)}%`;

    }else{
      
      const limit : number = Number(input_left.value);
      if(Number(element.value) <= limit){
        element.value = `${limit + 1}`;
      }
      if(Number(element.value) >= this.DeliveryOff*2){
        element.value = `${this.DeliveryOff*2}`;
      }
      c_right.style.left = `${4.75 * Number(element.value)}%`;
    }

    range.style.width = `${4.75*(Number(input_right.value) - Number(input_left.value))}%`;
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
}
