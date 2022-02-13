import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { PokemonStateService } from './global-state/pokemon-state.service';
import { PokemonCardModule } from './components/pokemon-card.component';

@NgModule({
  declarations: [AppComponent, PokedexComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PokemonCardModule,
  ],
  providers: [PokemonStateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
