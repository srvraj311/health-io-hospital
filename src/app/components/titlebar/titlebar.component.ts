import { Component, OnInit } from '@angular/core';
import {UiService} from "../../services/ui.service";
import {ElectronService} from "../../services/electron.service";

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {
  isElectron:boolean = this.uiService.isElectron();
  constructor(private uiService : UiService, private electron : ElectronService) {
    this.isElectron = this.uiService.isElectron();
  }
  ngOnInit(): void {

  }
  close(){
    console.log("CLose Button Clicked");
    this.electron.close();
  }
  minimise(){
    console.log("Minimise Button Clicked");
    this.electron.minimise();
  }
  maximise(){
    console.log("Maximise Button Clicked");
    this.electron.maximise();
  }
}
