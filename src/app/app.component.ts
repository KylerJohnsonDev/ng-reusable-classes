import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [':host{ height: 100%; width: 100% }'],
})
export class AppComponent {}
