import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Customer from '../models/customer.model';
import Task from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public router:Router,  public snakebar:MatSnackBar) { }

  tasksArr:Task[] = [];
  CustomersArr:Customer[] = [];

  opensnakebar(message:string, action:string){
    this.snakebar.open(message, action,{duration: 2000});
  }

  async getTasks(){
    const res = await fetch('http://localhost:1000/taskslist')
    const data = await res.json()
    console.log(data)
    this.tasksArr = data;
  }

  async getCustomers(){
    const res = await fetch('http://localhost:1000/customers')
    const data = await res.json()
    console.log(data)
    this.CustomersArr = data;
  }

  async newTask(body:{task:Task}){
    const res = await fetch('http://localhost:1000/addtask',{
      method:'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify(body)

    })
    const data = await res.json()
    console.log(data)
    if(res.status == 400){
      this.opensnakebar(data.msg,'Dismiss');
    }else{
    this.router.navigate(['/home']);
    this.opensnakebar('Task added!','Dismiss');
    }
  }

  
  async delTask(id:number){
    if(confirm('Are you sure you want to delete this post?')){
    const res = await fetch(`http://localhost:1000/${id}`,{
      method:'DELETE'
    })
    const data= await res.json()
    console.log(data.msg)
    this.getTasks()
    this.opensnakebar('Task deleted!','Dismiss');
  }}

  async doneTask(id:number, body:{done:boolean}){
    const res = await fetch(`http://localhost:1000/${id}`,{
      method:'PUT',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify(body)
    })
    const data= await res.json()
    console.log(data.msg)
    this.getTasks()
    this.opensnakebar(data.msg,'Dismiss');
  }



}
