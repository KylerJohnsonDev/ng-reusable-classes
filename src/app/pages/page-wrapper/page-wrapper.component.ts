import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
})
export class PageWrapperComponent {}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PageWrapperComponent],
  exports: [PageWrapperComponent],
})
export class PageWrappereModule {}
