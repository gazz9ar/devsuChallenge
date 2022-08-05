import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsService } from '../../shared/services/pokemons.service';

import { PokemonAddComponent } from './pokemon-add.component';

describe('PokemonAddComponent', () => {
  let component: PokemonAddComponent;
  let fixture: ComponentFixture<PokemonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonAddComponent ],
	  imports:[
		HttpClientTestingModule
	  ],
	  providers:[
		PokemonsService,		
	  ],
	  schemas:[
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
