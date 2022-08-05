import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs';
import { Pokemon } from '../../shared/models/Pokemon';
import { PokemonsService } from '../../shared/services/pokemons.service';
import { Unsub } from '../../../../core/unsubscriptions/Unsub';
import Swal from 'sweetalert2';



interface newPokemon {
	attack: number;
	defense: number;
	img: string;
	name: string;
}
@Component({
  selector: 'app-pokemon-add',
  templateUrl: './pokemon-add.component.html',
  styleUrls: ['./pokemon-add.component.scss']
})
export class PokemonAddComponent extends Unsub implements OnInit {

	public formPokemon:FormGroup = new FormGroup({
		name: new FormControl('', Validators.required),
		image: new FormControl('',Validators.required),
		attack: new FormControl(0,Validators.min(1)),
		defense: new FormControl(0,Validators.min(1)),
	});
	@Output() addOutput = new EventEmitter<newPokemon>();	
	@Input() isEdit:boolean = false;
	
	public pokemonToAdd:Pokemon;
	public saveEdit:string = 'Agregar';
	public saveEditTitle:string = 'Nuevo';
  constructor(private pokemonService:PokemonsService) { super() }

  ngOnInit(): void {	
		this.fillPokemon();
		this.subscribeToEditable();
  }

  private fillPokemon(): void {
	if(this.isEdit) {
		this.saveEdit = 'Editar';
		this.saveEditTitle = 'Editar';
		this.pokemonToAdd = this.pokemonService.currentPokemon;	
		this.formPokemon.get('name').setValue(this.pokemonService.currentPokemon.name);
		this.formPokemon.get('image').setValue(this.pokemonService.currentPokemon.image);
		this.formPokemon.get('attack').setValue(this.pokemonService.currentPokemon.attack);
		this.formPokemon.get('defense').setValue(this.pokemonService.currentPokemon.defense);
	} else {		
		this.saveEdit = 'Guardar';		
		this.saveEditTitle = 'Nuevo';
	}
	
  }

  subscribeToEditable(): void {

	// Subscribes to New change
	this.pokemonService.isNewOb
	.pipe(takeUntil(this.unsubscribe$))
	.subscribe(
		resp => {			
			if (resp) {				
				this.saveEdit = 'Guardar';
				this.saveEditTitle = 'Nuevo';
				this.formPokemon.reset();				
			}
		}
	)

	// Subscribes to Editable change
	this.pokemonService.pokemonToEditOb
	.pipe(takeUntil(this.unsubscribe$))
	.subscribe(
		resp => {			
			this.saveEditTitle = 'Editar';
			this.saveEdit = 'Editar';	
			this.pokemonToAdd = resp;			
			this.formPokemon.get('name').setValue(this.pokemonToAdd.name);
			this.formPokemon.get('image').setValue(this.pokemonToAdd.image);
			this.formPokemon.get('attack').setValue(this.pokemonToAdd.attack);
			this.formPokemon.get('defense').setValue(this.pokemonToAdd.defense);				
		}
	)		
  }

  addPokemon(): void {
	let pokemonToSend:Pokemon;
	
	this.pokemonToAdd = this.formPokemon.value;
	this.pokemonToAdd.hp = Math.floor(Math.random() * 101);	
	this.pokemonToAdd.type = 'Fire';
	this.pokemonToAdd.id_author = 1;
	this.pokemonToAdd.idAuthor = 1;
	//random ID
	// this.pokemonToAdd.id = Math.floor((Math.random() + 1 ) * (Math.random() + 1) * 100);
	pokemonToSend = this.pokemonToAdd;

	this.pokemonService.createPokemon(pokemonToSend)
	.pipe(
		takeUntil(this.unsubscribe$),
		finalize(()=>{
			this.addOutput.emit(this.formPokemon.value);	
		})
	)
	.subscribe(
		resp =>{
			if (resp.id) {
				Swal.fire(
					'Exito!',
					`Has añadido al Pokemon ${resp.name}!`,
					'success'
				  )		
			} else {				
				Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: 'Algo ha salido mal!',				
				})
			}				
		}
	)
	
  }

  updatePokemon(): void { 
	let pokemonToSend:Pokemon;
	this.pokemonService.currentPokemon.attack = this.formPokemon.get('attack').value;
	this.pokemonService.currentPokemon.defense = this.formPokemon.get('defense').value;
	this.pokemonService.currentPokemon.name = this.formPokemon.get('name').value;
	this.pokemonService.currentPokemon.image = this.formPokemon.get('image').value;
	pokemonToSend = this.pokemonService.currentPokemon;
	pokemonToSend.idAuthor = 1;	
	pokemonToSend.id_author = 1;	
	this.pokemonService.updatePokemon(pokemonToSend)
	.subscribe(
		resp => {
			if (resp.id) {
				Swal.fire(
					'Exito!',
					`Has editado al Pokemon correctamente!`,
					'success'
				  )		
			} else {				
				Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: 'Algo ha salido mal!',				
				})
			}		
		}
	)
  }
   
  onSubmit() {
	 
	if (this.formPokemon.invalid) {
		return;
	}
	this.isEdit ? this.updatePokemon() : this.addPokemon();		
  }

  close() {
	this.addOutput.emit();
  }

}
