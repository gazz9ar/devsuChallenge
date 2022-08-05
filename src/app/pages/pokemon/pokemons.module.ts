import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { PokemonAddComponent } from './components/pokemon-add/pokemon-add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonAddComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
	AngularMaterialModule,
	ReactiveFormsModule
  ],
  
})
export class PokemonsModule { }
