import {Component, OnInit} from '@angular/core';
import {BookingItem} from "../../../Models/HelperModals";
import {UiService} from "../../../services/ui.service";
import {ApiService} from "../../../services/api.service";
import {UserService} from "../../../services/user.service";
import {BookingService} from "../../../services/booking.service";

type Filter = { name: string, code: number }

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings!: BookingItem[];
  isSpinnerVisible: boolean = true;
  isEmpty: boolean = true;

  constructor(private ui: UiService,
              private api: ApiService,
              private user: UserService,
              private bookingService: BookingService
  ) {

  }

  // Days Filter
  selectable: boolean = true;
  days = [{name: 'All Time', code: 0},
    {name: "Last Hour", code: 1},
    {name: 'Today', code: 2},
    {name: "Yesterday", code: 5},
    {name: 'This Week', code: 3},
    {name: 'This Month', code: 4}];
  selectedDay: Filter = this.days[0];

  isSelectedDay(day: Filter): boolean {
    return this.selectedDay == day;
  }

  changeDay(day: Filter) {
    this.selectedDay = day;
    this.filterByDays();
  }

  ngOnInit(): void {
    console.log(" Starting Booking Heart-Beat");
    setTimeout(() => {
      this.bookingService.fetchBookingEverySeconds();
    }, 1000);
    this.filterByDays();
  }

  reload() {
    this.isSpinnerVisible = true;
    this.api.getBookingsFromApi(this.user.getUser().licence_id)
  }

  status: Filter[] = [
    {name: 'All', code: 0},
    {name: 'Failed', code: 1},
    {name: 'Booked', code: 2},
    {name: 'Cancelled', code: 3},
    {name: 'Discharged', code: 4},
  ]
  selectedStatus: Filter = this.status[0];

  isSelectedStatus(status: Filter) {
    return this.selectedStatus == status;
  }

  changeStatus(status: Filter) {
    this.selectedStatus = status;
    this.filterByDays();
  }

  types: Filter[] = [
    {name: 'All', code: 0},
    {name: 'Bed', code: 1},
    {name: 'ICU', code: 2},
    {name: 'CCU', code: 3},
    {name: 'Ventilator', code: 4},
  ]
  selectedType: Filter = this.types[0];
  searchText: string = "";

  isSelectedType(type: Filter) {
    return this.selectedType == type;
  }

  changeType(type: Filter) {
    this.selectedType = type;
    this.filterByDays()
  }

  private filterByType(b: BookingItem[]) {
    const typeCode = this.selectedType.code;
    const filteredItems = b.filter(b => {
      switch (typeCode) {
        case 1:
          return b.booking_type.toLowerCase() == 'bed';
        case 2:
          return b.booking_type.toLowerCase() == 'icu';
        case 3:
          return b.booking_type.toLowerCase() == 'ccu';
        case 4:
          return b.booking_type.toLowerCase() == 'ventilator';
        default:
          return true;
      }
    });
    this.search(filteredItems)
  }

  private filterByStatus(bb: BookingItem[]) {
    const statusCode: number = this.selectedStatus.code;
    const filteredItems = bb.filter(b => {
      switch (statusCode) {
        case 1:
          return b.booking_status.toLowerCase() == "failed"
        case 2:
          return b.booking_status.toLowerCase() == "booked"
        case 3:
          return b.booking_status.toLowerCase() == "cancelled"
        case 4:
          return b.booking_status.toLowerCase() == "discharged"
        default:
          return true;
      }
    });
    this.filterByType(filteredItems);
  }

  filterByDays() {
    const dayCode: number = this.selectedDay.code
    const currTime: number = +Date.now();
    this.bookingService.getBookings.subscribe((b) => {
      const allBookings = b as BookingItem[]
      if (allBookings) {
        this.isSpinnerVisible = false;
        this.isEmpty = allBookings.length <= 0;
        const filteredItems = allBookings.filter(booking => {
          switch (dayCode) {
            case 1:
              return currTime - parseInt(booking.booking_timestamp) < 3600000;
            case 2:
              return currTime - parseInt(booking.booking_timestamp) < 86400000;
            case 3:
              return currTime - parseInt(booking.booking_timestamp) < 604800000;
            case 4:
              return currTime - parseInt(booking.booking_timestamp) < 2592000000;
            case 5 :
              return currTime - parseInt(booking.booking_timestamp) < (48 * 3600000) && currTime - parseInt(booking.booking_timestamp) > (24 * 3600000)
            default:
              return true;
          }
        });
        this.filterByStatus(filteredItems);
      } else {
        this.isEmpty = true;
      }
    })
  }

  search(items: BookingItem[]) {
    this.bookings = items.filter(b => {
      return (b.patient_name.toLowerCase().includes(this.searchText.toLowerCase())
        || (b.email.toLowerCase().includes(this.searchText.toLowerCase()))
        || (b.patient_phone.toLowerCase().includes(this.searchText.toLowerCase()))
        || (b.booking_type.toLowerCase().includes(this.searchText.toLowerCase()))
        || (b.booking_status.toLowerCase().includes(this.searchText.toLowerCase()))
        || (b.time.toLowerCase().includes(this.searchText.toLowerCase()))
        || (b.date.toLowerCase().includes(this.searchText.toLowerCase()))
      );
    });
  }
}
