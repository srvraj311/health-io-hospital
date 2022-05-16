import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {User} from "../../../Models/HelperModals";
import {UserService} from "../../../services/user.service";
import {UiService} from "../../../services/ui.service";
import Hospital from "../../../Models/Hospital";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hospital!:Hospital;
  user!:User;
  constructor(private api : ApiService , private userService: UserService, private ui:UiService) {
    this.api.getHospital.subscribe((h) => {
      if(h){
        this.hospital = h as Hospital;
      }
    })
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {

  }

  logout() {
    this.userService.logout();
  }
}
