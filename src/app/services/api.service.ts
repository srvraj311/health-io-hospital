import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Hospital from "../Models/Hospital";
import {UserService} from "./user.service";
import {UiService} from "./ui.service";
import {User} from "../Models/HelperModals";
import {HttpClient} from "@angular/common/http";
import {HttpPaths} from "../Config/HttpPaths";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  hospital:BehaviorSubject<Hospital|null> = new BehaviorSubject<Hospital | null>(null);
  getHospital:Observable<Hospital|null> = this.hospital.asObservable();
  BASE_URL:string = '';
  constructor(private userService : UserService, private uiService:UiService, private http:HttpClient, private router : Router) {
    const url = localStorage.getItem('url');
    if(url){
      this.BASE_URL = url;
    }
  }

  getHospitalFromApi(){
    this.uiService.showProgressSpinner();
    if(this.userService.isUserLoggedIn()) {
      const user: User = this.userService.getUser();
      const url = `${this.BASE_URL}${HttpPaths.getHospital}${user.licence_id}`
      this.http.get<Hospital>(url)
        .subscribe(res => {
          if(res){
            localStorage.setItem("hospital" , JSON.stringify(res));
            this.uiService.showPositiveSnack('Hospital Details Fetched');
            this.uiService.hideProgressSpinner();
            return;
          }
          this.uiService.showErrorSnack("Failed to get Hospital details, Retry Later");
          this.uiService.hideProgressSpinner();
          return;
        })
    }else{
      this.router.navigate(['login']).then( _ => {
        this.uiService.showErrorSnack("Login to continue");
      })
    }
  }


}
