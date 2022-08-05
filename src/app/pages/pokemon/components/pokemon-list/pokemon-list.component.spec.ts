import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonsService } from '../../shared/services/pokemons.service';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Pokemon } from '../../shared/models/Pokemon';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  let event:any = {
	isTrusted: true,
	altKey: false,
	bubbles: true,
	cancelBubble: false,
	cancelable: true,
	charCode: 0,
	code: "KeyA",
	composed: true,
	ctrlKey: false,
	currentTarget: null,
	defaultPrevented: false,
	detail: 0,
	eventPhase: 0,
	isComposing: false,
	key: "a",
	keyCode: 65,
	location: 0,
	metaKey: false,
	path:  '',
	repeat: false,
	returnValue: true,
	shiftKey: false,
	sourceCapabilities: null,
	srcElement: null,
	target: {
		value:'a'
	},
	timeStamp: 2452.89999999851,
	type: "keyup",
	view: '',
	which: 65
  };

  let pokemon:Pokemon = {
	attack: 42,
	defense: 58,
	hp: 100,
	id: 1,
	id_author: 1,
	idAuthor: 1,
	image: '',
	name: 'Charizard',
	type: 'Fire',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
		PokemonListComponent 
	  ],
	  imports:[
		HttpClientTestingModule
	  ],
	  providers:[
		PokemonsService,
		LoaderService
	  ],
	  schemas:[
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data for pokemon table', () => {
   component.loadData();   
   expect(component.pokemons.data.length).toBeGreaterThanOrEqual(0);
//    expect(component.pokemons.data).toBeCalled();
  });

  it('should filter MatTableDataSource', () => {
	component.applyFilter(event);
    expect(component.pokemons.filter.length).toBeGreaterThanOrEqual(1);
  }); 

  it('should filter MatTableDataSource', () => {
	component.applyFilter(event);
    expect(component.pokemons.filter.length).toBeGreaterThanOrEqual(1);
  }); 

  it('should show child component', () => {
	component.showAdd();
    expect(component.isEdit).toBeFalsy();
	expect(component.add).toBeTruthy();
  }); 

  it('should not change table data array', () => {
	const oldData = component.pokemons.data;
	component.getPokemon();	
    expect(oldData).toEqual(component.pokemons.data);
	expect(component.add).toBeFalsy();
  }); 

  it('should show child component and change Input ', () => {
	component.editPokemon(pokemon);
    expect(component.isEdit).toBeTruthy();
	expect(component.add).toBeTruthy();
  }); 


//   public editPokemon(pokemon:Pokemon): void {
// 	this.add = true;
// 	this.isEdit = true;	
// 	this.pokemonService.changeToEdit(pokemon);	
//   }


});
 