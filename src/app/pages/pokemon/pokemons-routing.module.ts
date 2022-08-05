import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
	{
		path:'list',
		component:PokemonListComponent
	},
	{ path: "", redirectTo: "list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
