import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <h1 class="text-center text-white text-shadow">Welcome to {{ title }}!</h1>

      <router-outlet /> 
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'chat';
}
