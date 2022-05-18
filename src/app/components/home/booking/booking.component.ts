import { Component, OnInit } from '@angular/core';
import {BookingItem} from "../../../Models/HelperModals";
import {UiService} from "../../../services/ui.service";
import {ApiService} from "../../../services/api.service";
import {UserService} from "../../../services/user.service";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings! : BookingItem[];
  isSpinnerVisible : boolean = true;
  isEmpty : boolean = true;
  constructor(private ui:UiService ,
              private api : ApiService,
              private user: UserService,
              private bookingService : BookingService
  ) {
    this.api.getBookings.subscribe((b) => {
      if(b){
        this.bookings = b as BookingItem[];
        this.isSpinnerVisible = false;
        this.isEmpty = this.bookings.length == 0;
      }
    })
  }

  ngOnInit(): void {
    console.log("Starting Booking Heart-Beat");
    setTimeout(() => {
      this.bookingService.fetchBookingEverySeconds();
    }, 1000);
  }

  reload() {
    this.isSpinnerVisible = true;
    this.api.getBookingsFromApi(this.user.getUser().licence_id)
  }
}
