import { Component, OnInit } from '@angular/core';
import {UiService} from "../../services/ui.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private uiService : UiService, private userService: UserService, private router : Router, private api : ApiService) {
    if(!this.userService.isUserLoggedIn()){
      this.router.navigate(['login']).then( _ => {
        console.log('User not logged in');
      })

    }
  }

  ngOnInit(): void {
    this.api.getHospitalFromApi();
  }

  logout() {
    this.userService.logout();
  }
}
