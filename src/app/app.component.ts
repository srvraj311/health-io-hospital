import { Component } from '@angular/core';
import {UiService} from "./services/ui.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Health-IO-Admin';
  isSpinnerOverlayVisible!: boolean;

  constructor(private uiService : UiService, private userService : UserService) {
    this.uiService.spinnerVisibleObservable.subscribe((result) => {
      this.isSpinnerOverlayVisible = result as boolean;
    })
    this.userService.getBaseUrl();
  }

}
