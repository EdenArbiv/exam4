import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {

  constructor(public _data:DataService, public router:Router, public _fb:FormBuilder) { }

  
  form:FormGroup =  this._fb.group({
    description:['', [Validators.required]],
    customer_id:['', [Validators.required]]
  })



  ngOnInit(): void {
    this._data.getCustomers()
  }

}
