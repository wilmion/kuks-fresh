import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {

  @Input() message:string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
