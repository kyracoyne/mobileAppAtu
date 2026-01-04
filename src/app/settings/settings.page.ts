import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonRadio, IonRadioGroup, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { SettingsService, MeasurementUnit } from '../services/settings';
import { arrowBackOutline } from 'ionicons/icons'; // added for back and favourite buttons
import { Router } from '@angular/router'; // added for back button

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonRadio, IonRadioGroup, IonButtons, IonButton, IonIcon, CommonModule, FormsModule ]
})

export class SettingsPage implements OnInit {
  selectedUnit: MeasurementUnit = 'metric';
  arrowBackOutline = arrowBackOutline;
  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {}
  // Load any saved preference or default to metric
  async ngOnInit() {
    this.selectedUnit = await this.settingsService.getMeasurementUnit();
  }
  // Persist changes
  async onUnitChanged(newUnit: MeasurementUnit) {
    this.selectedUnit = newUnit;
    await this.settingsService.setMeasurementUnit(newUnit);
  }
  goBackHome() {
    this.router.navigate(['/home']);
  }
}
