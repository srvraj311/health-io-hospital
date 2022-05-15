import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UiService} from "../../services/ui.service";
import {UserService} from "../../services/user.service";
import {LoginReq} from "../../Models/HelperModals";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  licence_id = new FormControl('', [Validators.required]);
  hide: boolean = true;

  constructor(private uiService : UiService, private userService : UserService, private router:Router) {
    if(this.userService.isUserLoggedIn()){
      this.router.navigate(['home']).then( _ => {
        console.log('User already logged in');
      })
    }
  }

  ngOnInit(): void {

  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    const reqObj: LoginReq = {
      email: this.email.value,
      password: this.password.value,
      licence_id: this.licence_id.value
    }

    if(reqObj.email == "" || reqObj.password == "" || reqObj.licence_id == ""){
      this.uiService.showErrorSnack("All fields are Required");
      return;
    }

    this.userService.login(reqObj);
  }
}
