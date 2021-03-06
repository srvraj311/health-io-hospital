import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Hospital from '../Models/Hospital';
import { UserService } from './user.service';
import { UiService } from './ui.service';
import {
  Availability,
  BloodBank,
  BookingItem,
  EmergencyCase,
  EmergencyReqModal,
  Facility,
  Primary,
  User,
} from '../Models/HelperModals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpPaths } from '../Config/HttpPaths';
import { Router } from '@angular/router';
import { utf8Encode } from '@angular/compiler/src/util';

const JSON_Header = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private hospital: BehaviorSubject<Hospital | null> =
    new BehaviorSubject<Hospital | null>(null);
  getHospital: Observable<Hospital | null> = this.hospital.asObservable();
  BASE_URL: string = '';
  private booking: BehaviorSubject<BookingItem[] | null> = new BehaviorSubject<
    BookingItem[] | null
  >(null);
  getBookings = this.booking.asObservable();

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private http: HttpClient,
    private router: Router
  ) {
    const url = localStorage.getItem('url');
    if (url) {
      this.BASE_URL = url;
    } else {
      console.log('Unable to get URL from Server');
      this.uiService.showErrorSnack('Server URL not found');
    }
  }

  getHospitalFromApi() {
    this.uiService.showProgressSpinner();
    if (this.userService.isUserLoggedIn()) {
      const user: User = this.userService.getUser();
      const url = `${this.BASE_URL}${HttpPaths.getHospital}${user.licence_id}`;
      this.http.get<Hospital>(url).subscribe((res) => {
        if (res) {
          this.hospital.next(res);
          localStorage.setItem('hospital', JSON.stringify(res));
          this.uiService.showPositiveSnack('Hospital Details Fetched');
          this.uiService.hideProgressSpinner();
          return;
        }
        this.uiService.showErrorSnack(
          'Failed to get Hospital details, Retry Later'
        );
        this.uiService.hideProgressSpinner();
        return;
      });
    } else {
      this.router.navigate(['login']).then((_) => {
        this.uiService.showErrorSnack('Login to continue');
      });
    }
  }

  getHospitalFromLocal(): Hospital | null {
    const saved = localStorage.getItem('hospital');
    if (saved) {
      this.hospital.next(JSON.parse(saved));
      return JSON.parse(saved);
    }
    return null;
  }

  setHospitalToLocal(res: string) {
    const hospital: Hospital = JSON.parse(res);
    localStorage.setItem('hospital', JSON.stringify(hospital));
    this.hospital.next(hospital);
  }

  updatePrimary(details: Primary) {
    const url = `${this.BASE_URL}${HttpPaths.updatePrimary}`;
    this.callUpdateApi(url, details);
  }

  updateAvailability(details: Availability) {
    const url = `${this.BASE_URL}${HttpPaths.updateAvailability}`;
    this.callUpdateApi(url, details);
  }

  updateFacility(details: Facility) {
    const url = `${this.BASE_URL}${HttpPaths.updateFacility}`;
    this.callUpdateApi(url, details);
  }

  updateBloodBank(details: BloodBank) {
    const url = `${this.BASE_URL}${HttpPaths.updateBloodBank}`;
    this.callUpdateApi(url, details);
  }

  callUpdateApi(
    url: string,
    details: Primary | Availability | Facility | BloodBank
  ) {
    this.uiService.showProgressSpinner();
    if (this.userService.isUserLoggedIn()) {
      details.email = this.userService.getUser().email;
      details.token = this.userService.getUser().token;
      this.http
        .post<any>(url, JSON.stringify(details), {
          headers: JSON_Header,
        })
        .subscribe((res) => {
          this.handleUpdateError(res);
        });
    }
  }

  getBookingsFromApi(licence_id: string) {
    const url = `${this.BASE_URL}${HttpPaths.getBookings}${licence_id}`;
    this.http.get<any>(url).subscribe((res) => {
      if (res) {
        if (res.status == '200') {
          const list: BookingItem[] = JSON.parse(res.bookings);
          if (list != null) {
            this.booking.next(list);
          } else {
            this.uiService.showErrorSnack(
              'Bookings Empty or Not Received Properly'
            );
          }
        } else if (res.status == '400') {
          this.uiService.showErrorSnack('No Bookings to Display');
        } else {
          this.uiService.showErrorSnack('Unable to Process Bookings');
        }
      } else {
        this.uiService.showErrorSnack(
          'There seems a network issue while getting Bookings'
        );
      }
    });
    this.getViewCounts();
  }

  private handleUpdateError(res: any) {
    console.log(res);
    if (res) {
      if (res.status == 200) {
        this.setHospitalToLocal(res.hospital);
        this.uiService.showPositiveSnack(res.message);
        this.uiService.hideProgressSpinner();
        return;
      } else if (res.status == 400) {
        this.uiService.showErrorSnack('Session Expired');
        this.userService.logout();
        this.uiService.hideProgressSpinner();
        return;
      } else {
        this.uiService.showErrorSnack('There seems a Network Error');
        this.uiService.hideProgressSpinner();
        return;
      }
    } else {
      this.uiService.showErrorSnack('Unknown Network Error');
      this.uiService.hideProgressSpinner();
      return;
    }
  }

  discharge(id: string): Observable<any> {
    const url = `${this.BASE_URL}${HttpPaths.dischargeBooking}`;
    const body = { booking_id: id };
    return this.http.post<any>(url, JSON.stringify(body), {
      headers: JSON_Header,
    });
  }

  cancelBooking(id: string): Observable<any> {
    const url = `${this.BASE_URL}${HttpPaths.cancelBooking}`;
    const body = { booking_id: id };
    return this.http.post<any>(url, JSON.stringify(body), {
      headers: JSON_Header,
    });
  }

  getViewCounts() {
    const url = `${this.BASE_URL}${HttpPaths.getViewCounts}${
      this.userService.getUser().licence_id
    }`;
    this.http.get<any>(url).subscribe((res) => {
      if (res) {
        if (res.status == '200') {
          this.uiService.setCount(res.count as string);
          console.log('View Refreshed' + ' ' + res.count);
        }
      } else {
        this.uiService.showErrorSnack(
          'There seems a network issue while getting View Counts'
        );
      }
    });
  }

  getEmergencyList() {
    const url = `${this.BASE_URL}${HttpPaths.getEmergencyList}${
      this.userService.getUser().licence_id
    }`;
    return this.http.get<any>(url);
  }

  addEmergency(emergencyCase: EmergencyCase) {
    const req: EmergencyReqModal = {
      licence_id: this.userService.getUser().licence_id,
      emergency_case: JSON.stringify(emergencyCase),
      email: this.userService.getUser().email,
      token: this.userService.getUser().token,
    };
    const url = `${this.BASE_URL}${HttpPaths.addEmergency}`;
    return this.http.post<any>(url, JSON.stringify(req), {
      headers: JSON_Header,
    });
  }

  updateEmergency(emergency: EmergencyCase) {
    const req: EmergencyReqModal = {
      licence_id: this.userService.getUser().licence_id,
      emergency_case: JSON.stringify(emergency),
      email: this.userService.getUser().email,
      token: this.userService.getUser().token,
      id: emergency.id,
    };
    console.log(req);
    const url = `${this.BASE_URL}${HttpPaths.updateEmergency}`;
    return this.http.put<any>(url, JSON.stringify(req), {
      headers: JSON_Header,
    });
  }

  deleteBooking(emergency: EmergencyCase) {
    const url = `${this.BASE_URL}${HttpPaths.deleteEmergency}${emergency.id}`;
    return this.http.delete<any>(url, {
      headers: JSON_Header,
    });
  }
}
