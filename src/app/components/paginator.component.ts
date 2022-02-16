import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { PaginationActions } from '../models/api.model';

@Component({
  selector: 'app-paginator',
  template: `
    <article class="flex flex-inline justify-end">
      <span>Page {{ pageIndex + 1 }} of {{ totalNumOfPages }}</span>
      <span
        *ngIf="pageIndex > 0"
        class="ml-4 underline text-blue-600 hover:cursor-pointer hover:font-bold"
        (click)="paginationChange.emit(paginationActions.backward)"
        >Previous</span
      >
      <span
        *ngIf="pageIndex < totalNumOfPages"
        class="ml-4 underline text-blue-600 hover:cursor-pointer hover:font-bold"
        (click)="paginationChange.emit(paginationActions.forward)"
        >Next</span
      >
    </article>
  `,
})
export class PaginatorComponent {
  @Input() pageIndex!: number;
  @Input() totalNumOfPages!: number;
  @Input() previousPageUrl!: string | null;
  @Input() nextPageUrl!: string | null;

  readonly paginationActions = PaginationActions;

  // should emit either previousPageUrl or nextPageUrl
  @Output() paginationChange = new EventEmitter<PaginationActions>();
}

@NgModule({
  imports: [CommonModule],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
