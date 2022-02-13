import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-wrapper',
  template: `
    <nav
      class="bg-blue-900 text-white flex flex-col md:flex-row justify-between p-2"
    >
      <a routerLink="/">
        <img
          class="h-12"
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          alt="Pokemon logo"
        />
      </a>
      <div class="flex flex-row items-center underline hover:font-bold">
        <a routerLink="/" routerLinkActive="router-link-active">Pokedex</a>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class PageWrapperComponent {}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PageWrapperComponent],
  exports: [PageWrapperComponent],
})
export class PageWrappereModule {}
