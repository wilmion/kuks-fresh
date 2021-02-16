import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  mapNavigation:IMapNavigation[] = [];
  constructor() { 
    this.mapNavigation = [
      {
        icon: "far fa-user",
        text: "My Profile"
      },
      {
        icon: "fas fa-mug-hot",
        text: "Your Items"
      },
      {
        icon: "fas fa-shipping-fast",
        text: "Your Order"
      },
      {
        icon: "far fa-handshake",
        text: "Payment Method"
      }
    ]
  }

  ngOnInit(): void {
  }

}
interface IMapNavigation{
  icon:string;
  text:string;
}
