import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  template: `
    <article class="flex flex-inline justify-end">
      <span>Showing: {{ displayCount }}</span>
      <span
        *ngIf="previousPageUrl"
        class="ml-4 underline text-blue-600 hover:cursor-pointer hover:font-bold"
        (click)="paginationChange.emit(previousPageUrl)"
        >Previous</span
      >
      <span
        *ngIf="nextPageUrl"
        class="ml-4 underline text-blue-600 hover:cursor-pointer hover:font-bold"
        (click)="paginationChange.emit(nextPageUrl)"
        >Next</span
      >
    </article>
  `,
})
export class PaginatorComponent {
  @Input() displayCount!: number;
  @Input() previousPageUrl!: string | null;
  @Input() nextPageUrl!: string | null;

  // should emit either previousPageUrl or nextPageUrl
  @Output() paginationChange = new EventEmitter<string>();
}

@NgModule({
  imports: [CommonModule],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
