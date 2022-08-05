import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path:'pokemons',
		loadChildren: () => import('./pages/pokemon/pokemons.module').then(m => m.PokemonsModule)
	},
	{ path: "", redirectTo: "pokemons", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
