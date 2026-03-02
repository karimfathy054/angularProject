import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Signal holding the current theme
  isDarkMode = signal(false);

  constructor() {
    // Load saved preference from localStorage
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      this.isDarkMode.set(saved === 'true');
    }

    // Effect to apply theme class and persist preference
    effect(() => {
      const dark = this.isDarkMode();
      document.body.classList.toggle('dark-theme', dark);
      document.body.classList.toggle('light-theme', !dark);
      localStorage.setItem('darkMode', String(dark));
    });
  }

  toggleTheme() {
    this.isDarkMode.update((value) => !value);
  }
}
