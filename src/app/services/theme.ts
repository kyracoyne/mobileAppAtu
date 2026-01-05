import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
export type ThemeSetting = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly KEY = 'themeSetting';
  // Read saved theme setting (default = system)
  async getThemeSetting(): Promise<ThemeSetting> {
  const result = await Preferences.get({ key: this.KEY });
  if (result.value === 'dark') {
    return 'dark';
  }
  // Default to light 
  return 'light';
  }

  // Save theme setting
  async setThemeSetting(setting: ThemeSetting): Promise<void> {
    await Preferences.set({
      key: this.KEY,
      value: setting,
    });
  }

  // Apply theme - toggle css class on root html element
  // global.scss updated to import dark.class.css, and Ionic listens for ion-palette-dark
  applyTheme(setting: ThemeSetting): void {
  const root = document.documentElement;
  if (setting === 'dark') {
    root.classList.add('ion-palette-dark');
  } else {
    root.classList.remove('ion-palette-dark');
  }
  }
}
