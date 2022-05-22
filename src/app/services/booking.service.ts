import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {UserService} from "./user.service";
import {UiService} from "./ui.service";
import {BehaviorSubject} from "rxjs";
import {BookingItem} from "../Models/HelperModals";
import AppHelper from "../Helper/AppHelper";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: BehaviorSubject<BookingItem[]> = new BehaviorSubject<BookingItem[]>([]);
  getBookings = this.bookings.asObservable();

  constructor(private apiService: ApiService, private uiService: UiService, private user: UserService) {
    this.apiService.getBookings.subscribe((b) => {
      b?.sort((a, b) => {
        return AppHelper.compareDatesAndTimes( b.date, b.time, a.date, a.time);
      });
      this.bookings.next(b as BookingItem[]);
    })
  }

  fetchBookingEverySeconds() {
    setInterval(() => {
      this.apiService.getBookingsFromApi(this.user.getUser().licence_id);
    }, 2000);
  }

  dischargeBooking(booking: BookingItem) {
    this.uiService.setWaiting(true);
    this.apiService.discharge(booking.id).subscribe((res) => {
      this.handleResponse(res, "Discharged", booking)
    });
  }

  cancelBooking(booking: BookingItem) {
    this.uiService.setWaiting(true);
    this.apiService.cancelBooking(booking.id).subscribe((res) => {
      this.handleResponse(res, "Cancelled", booking);
    })
  }

  handleResponse(res: any, msg: string, booking : BookingItem) {
    if (res) {
      if (res.status == 200) {
        this.uiService.showPositiveSnack(`Booking ${booking.patient_name} has been ${msg} successfully`);
      } else if (res.status == 301) {
        this.uiService.showErrorSnack(`Already ${msg}`)
      } else {
        this.uiService.showErrorSnack(`The booking you tried to ${msg}, Was not found on the server, Please Reload the Page`)
      }
    } else {
      this.uiService.showErrorSnack("Something went wrong, Please try again later")
    }
    this.uiService.setWaiting(false);
  }
}
