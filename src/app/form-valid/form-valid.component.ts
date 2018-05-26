import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-valid',
  templateUrl: './form-valid.component.html',
  styleUrls: ['./form-valid.component.css']
})
export class FormValidComponent implements OnInit {
  @Input('formControlData') formControlData:any
  @Input('formGroupData') formGroupData:any 
  @Input('patternMsg') patternMsg:string 
  @Input('requiredMsg') requiredMsg:string 
  @Input('emailMsg') emailMsg:string 
  @Input('maxlengthMsg') maxlengthMsg:string 
  @Input('minlengthMsg') minlengthMsg:string 

  constructor() { }

  ngOnInit() {
  }

}


