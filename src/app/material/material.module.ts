import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ], exports: [
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSidenavModule,
  ]
})
export class MaterialModule {
}
