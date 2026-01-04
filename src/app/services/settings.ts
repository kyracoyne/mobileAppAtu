import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export type MeasurementUnit = 'metric' | 'us';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // Key identifier for settings
  private readonly KEY = 'measurementUnit';
  // Check if any value in storage if nothing default to 'metric'
  async getMeasurementUnit(): Promise<MeasurementUnit> {
    const result = await Preferences.get({ key: this.KEY });
    if (result.value === 'us' || result.value === 'metric') {
      return result.value as MeasurementUnit;
    } else {
      return 'metric';
    }
  }
  // Save the chosen unit to storage
  async setMeasurementUnit(unit: MeasurementUnit): Promise<void> {
    await Preferences.set({
      key: this.KEY,
      value: unit,
    });
  }
}