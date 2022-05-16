import { Component, OnInit } from '@angular/core';
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private uiService:UiService) { }

  ngOnInit(): void {
  }

  toggleNav() {
    this.uiService.toggleSideNav();
  }
}
