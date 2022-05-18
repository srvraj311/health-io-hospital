import { Component, OnInit } from '@angular/core';
import {BookingItem} from "../../../Models/HelperModals";
import {UiService} from "../../../services/ui.service";
import {ApiService} from "../../../services/api.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings! : BookingItem[];
  isSpinnerVisible : boolean = true;
  isEmpty : boolean = true;
  constructor(private ui:UiService , private api : ApiService, private user: UserService) {
    this.api.getBookings.subscribe((b) => {
      if(b){
        this.bookings = b as BookingItem[];
        this.isSpinnerVisible = false;
        this.isEmpty = this.bookings.length == 0;
      }
    })
  }

  ngOnInit(): void {
    console.log(this.bookings);
  }

  reload() {
    this.isSpinnerVisible = true;
    this.api.getBookingsFromApi(this.user.getUser().licence_id)
  }
}
