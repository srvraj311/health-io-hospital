import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {AppComponent} from "../app.component";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {HomeComponent} from "../components/home/home.component";
import {ErrorComponent} from "../components/error/error.component";


const routes : Routes = [
  {path : "login" , component : LoginComponent, },
  {path : "home" , component : HomeComponent},
  {path : "", component : HomeComponent},
  {path : "**" , component : ErrorComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRouterModule { }
