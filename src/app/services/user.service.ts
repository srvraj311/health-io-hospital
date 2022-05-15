import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UiService} from "./ui.service";
import {LoginReq, User} from "../Models/HelperModals";
import {HttpPaths} from "../Config/HttpPaths";
import {Router} from "@angular/router";

const GITHUB_URL = "https://raw.githubusercontent.com/srvraj311/health.io-API/main/url.json";
const JSON_Header = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = '';


  constructor(private http: HttpClient, private uiService: UiService, private router: Router) {
  }

  getBaseUrl() {
    this.uiService.showProgressSpinner();
    this.http.get<any>(GITHUB_URL).subscribe((response) => {
      if (response && response.url) {
        this.BASE_URL = response.url
        localStorage.setItem("url", response.url);
        this.uiService.showPositiveSnack('Network Connection Established')
        console.log(this.BASE_URL)
      } else {
        this.uiService.showErrorSnack("Failed to Fetch Data from Internet");
      }
      this.uiService.hideProgressSpinner();
    })
  }

  login(req: LoginReq) {
    this.uiService.showProgressSpinner();
    const url = `${this.BASE_URL}${HttpPaths.feederLogin}`
    this.http.post<any>(url, JSON.stringify(req), {
      headers: JSON_Header
    }).subscribe((response) => {
      if (response && response.status == "200") {
        this.saveUserData(response as User);
        this.router.navigate(['home']).then(_ => {
          this.uiService.showPositiveSnack("Login Successful");
        })
      } else {
        this.uiService.showErrorSnack("Unable to login, Try again Later");
      }
      this.uiService.hideProgressSpinner();
    })

  }

  saveUserData(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isUserLoggedIn(): boolean {
    const local = (localStorage.getItem('user'));
    if (local) {
      const user: User = JSON.parse(local);
      return user.email != "" && user.token != "";
    }
    return false;
  }

  getUser() {
    const local = (localStorage.getItem('user'));
    // @ts-ignore
    const user: User = JSON.parse(local);
    return user;
  }

  logout() {
    const local = localStorage.getItem('user');
    if (local) {
      const user: User = JSON.parse(local);
      const req = {
        email: user.email,
        token: user.token
      }
      const url = `${this.BASE_URL}${HttpPaths.feederLogout}`
      this.http.post<any>(url, JSON.stringify(req), {
        headers: JSON_Header
      }).subscribe((res) => {
        if (res) {
          console.log(res)
        }
      })
    }
    localStorage.setItem('user', "");
    this.router.navigate(["/login"]).then(_ => this.uiService.showPositiveSnack("Logout Successful"));
  }
}
