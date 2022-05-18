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
  sideNavOpened!: boolean;

  constructor(private uiService : UiService, private userService: UserService, private router : Router, private api : ApiService) {
    if(!this.userService.isUserLoggedIn()){
      this.router.navigate(['login']).then( _ => {
        console.log('User not logged in');
      })
    }
    this.uiService.getNavOpen.subscribe((r) => this.sideNavOpened = r as boolean);
  }

  ngOnInit(): void {
    this.api.getHospitalFromApi();
    this.api.getBookingsFromApi(this.userService.getUser().licence_id);
    // this.api.getBookingsFromApi("TTTTTT");
  }
  toggleSideNav(){
    this.uiService.toggleSideNav();
  }

  logout() {
    this.userService.logout();
  }
}
