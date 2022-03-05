import { CustomersComponent } from './components/customers/customers.component';
import { Page404Component } from './components/page404/page404.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"home", component:HomeComponent },
  {path:"addtask", component:AddtaskComponent },
  {path:"customers", component:CustomersComponent },
  {path:"", redirectTo:"home", pathMatch:"full" },
  {path:"**", component:Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
