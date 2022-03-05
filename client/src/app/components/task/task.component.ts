import { DataService } from './../../services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import Task from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(public _data:DataService) { }
  
  @Input()
  task: any;

  ngOnInit(): void {
  }

 

}
