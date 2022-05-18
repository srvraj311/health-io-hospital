import {Component, Input, OnInit} from '@angular/core';
import {BookingItem} from "../../../../Models/HelperModals";
import {BookingService} from "../../../../services/booking.service";
import {UiService} from "../../../../services/ui.service";

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.css']
})
export class BookingItemComponent implements OnInit {

  @Input() booking!: BookingItem;
  waiting: boolean = false;
  waiting2: boolean = false;

  constructor(private bookingService : BookingService, private ui : UiService) {
    // this.ui.getWaiting.subscribe((w) => {
    //   this.waiting = w;
    // })
  }


  ngOnInit(): void {
  }

  discharge(booking:BookingItem) {
    this.waiting = true;
    setTimeout(() => {
      this.waiting = false;
    } , 5000);
    this.bookingService.dischargeBooking(booking);
  }
  cancel(booking : BookingItem) {
    this.waiting2 = true;
    setTimeout(() => {
      this.waiting2 = false;
    } , 3000);
    this.bookingService.cancelBooking(booking);
  }
}
