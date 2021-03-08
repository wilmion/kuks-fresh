import { Component, OnInit , Input} from '@angular/core';
import { IProfileFrame } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-information-block',
  templateUrl: './information-block.component.html',
  styleUrls: ['./information-block.component.scss']
})
export class InformationBlockComponent implements OnInit {

  @Input() dataFrame: IProfileFrame | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  showEditIcon( i:number , show:boolean):void {
    if(this.dataFrame){
      this.dataFrame.configs[i].edit = show;
    }
    
  }

  toggleEdit(i:number):void {
    if(this.dataFrame){
      this.dataFrame.configs[i].edit = !this.dataFrame.configs[i].edit;
    }
  }

}
