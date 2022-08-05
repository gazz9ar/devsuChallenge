import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../../shared/services/pokemons.service';
import { Pokemon } from '../../shared/models/Pokemon';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { Unsub } from '../../../../core/unsubscriptions/Unsub';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent extends Unsub implements OnInit {

	displayedColumns: string[] = ['name', 'image', 'attack', 'defense','actions'];	
	public pokemons = new MatTableDataSource<Pokemon>([]);
	public add:boolean = false;	
	public isEdit:boolean = false;
	
  constructor(private pokemonService:PokemonsService,
	public loaderService:LoaderService) { 
		super();
	}

  ngOnInit(): void {
	this.loadData();	
  }

  public loadData(): void {
	this.pokemonService.getPokemons()
	.pipe(takeUntil(this.unsubscribe$))
	.subscribe((resp) => {		
		this.pokemons.data = resp;		
	});
  }

  applyFilter(event: Event) {		
			console.log(event);
			
    const filterValue:string = (event.target as HTMLInputElement).value;
    this.pokemons.filter = filterValue.trim().toLowerCase();
  }

  public showAdd(): void {
	this.add = true;
	this.isEdit = false;
	this.pokemonService.changeToNew();
	// console.log(this.pokemons.data);
  }

  getPokemon(): void {	
	this.loadData();
	this.add = false;
  }

  public editPokemon(pokemon:Pokemon): void {
	this.add = true;
	this.isEdit = true;	
	this.pokemonService.changeToEdit(pokemon);	
  }

  public deletePokemon(pokemon:Pokemon): void {
	Swal.fire({
		title: 'Estas seguro?',
		text: `Estas por eliminar el Pokemon ${pokemon.name} `,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#673AB7',
		cancelButtonColor: '#ccc',
		confirmButtonText: 'Eliminar',
		cancelButtonText:'Cancelar'
	  }).then((result) => {
		if (result.isConfirmed) {
			let pokemonToDelete:Pokemon = pokemon;
			pokemonToDelete.idAuthor = 2;
			pokemonToDelete.id_author = 2;
			this.pokemonService.updatePokemon(pokemon)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				resp =>{
					this.loadData();				
				}
			)
		  Swal.fire(
			'Exito!',
			`Se ha eliminado el Pokemon ${pokemon.name}.`,
			'success'
		  )
		}
	  })
  }
}
