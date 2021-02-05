import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-option-filter',
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.scss']
})
export class OptionFilterComponent implements OnInit {

  @Input() title:string = '';
  @Input() urlImage:string| undefined;
  @Input() notImage:boolean| undefined;

  constructor() { 

  }

  ngOnInit(): void {

  }

}
