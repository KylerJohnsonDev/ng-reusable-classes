import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { GenerationOption, PaginationOptions } from '../models/api.model';

@Component({
  selector: 'app-generation-selection',
  template: `
    <section
      class="grid gap-2 md:grid-cols-6 grid-cols-1 border border-blue-800 rounded p-4"
    >
      <p
        class="p-2 bg-gray-200 text-gray-900 rounded text-center"
        *ngFor="let option of generationOptions"
        (click)="optionSelected.emit(option.paginationOptions)"
      >
        {{ option.description }}
      </p>
    </section>
  `,
})
export class GenerationSelectionComponent {
  generationOptions: GenerationOption[] = [
    {
      description: 'Gen 1',
      paginationOptions: { limit: 151, offset: 0 },
    },
    {
      description: 'Gen 2',
      paginationOptions: { limit: 100, offset: 151 },
    },
    {
      description: 'Gen 3',
      paginationOptions: { limit: 135, offset: 251 },
    },
    {
      description: 'Gen 4',
      paginationOptions: { limit: 107, offset: 493 },
    },
    {
      description: 'Gen 5',
      paginationOptions: { limit: 156, offset: 649 },
    },
    {
      description: 'Gen 6',
      paginationOptions: { limit: 72, offset: 721 },
    },
  ];

  @Output() optionSelected = new EventEmitter<PaginationOptions>();
}

@NgModule({
  imports: [CommonModule],
  declarations: [GenerationSelectionComponent],
  exports: [GenerationSelectionComponent],
})
export class GenerationSelectionModule {}
