import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonSummary } from '../models/api.model';

@Component({
  selector: 'app-pokemon-card',
  template: `
    <a
      class="p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
      [routerLink]="['details', pokemonSummary.id]"
    >
      <img [src]="pokemonSummary.imageUrl" [alt]="pokemonSummary.name" />
      <h2>{{ pokemonSummary.id }}. {{ pokemonSummary.name }}</h2>
    </a>
  `,
  styles: [],
})
export class PokemonCardComponent {
  @Input() pokemonSummary!: PokemonSummary;
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PokemonCardComponent],
  exports: [PokemonCardComponent],
})
export class PokemonCardModule {}
