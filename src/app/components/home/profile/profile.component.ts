import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {User} from "../../../Models/HelperModals";
import {UserService} from "../../../services/user.service";
import {UiService} from "../../../services/ui.service";
import Hospital from "../../../Models/Hospital";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hospital!:Hospital;
  user!:User;
  views!: string;
  bookingCount: number = 0;
  constructor(private api : ApiService , private userService: UserService, private ui:UiService, private bookingService : BookingService) {
    this.api.getHospital.subscribe((h) => {
      if(h){
        this.hospital = h as Hospital;
      }
    })
    this.ui.getViews.subscribe((v) => {
      this.views = v;
    })
    this.api.getBookings.subscribe((b) => {
      if(b){
        this.bookingCount = b.length;
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
