import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, throwError, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/Pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

 private url = environment.URL;
 public pokemonToEditSubject:Subject<Pokemon> = new Subject();
 pokemonToEditOb:Observable<Pokemon> = this.pokemonToEditSubject.asObservable();
 public isNewSubject:Subject<boolean> = new Subject();
 isNewOb:Observable<boolean> = this.isNewSubject.asObservable();
 public currentPokemon:Pokemon;

  constructor(private http:HttpClient) {  }

  public getPokemons(): Observable<Pokemon[]>{
	const getPokemonsURL = this.url + '?idAuthor=1';
	return this.http.get(getPokemonsURL)
	.pipe(
        map((res:Pokemon[]) =>res),
        catchError(this.handleError)
	);
  }
  public changeToEdit(pokemon:Pokemon) {
	this.currentPokemon = pokemon;
	this.pokemonToEditSubject.next(pokemon);
	this.isNewSubject.next(false);
  }
  public changeToNew(): void {
	this.isNewSubject.next(true);
	if (this.currentPokemon) {
		this.currentPokemon = null;	
	}
  }

  public createPokemon(pokemon:Pokemon): Observable<Pokemon>{
	const getPokemonsURL = this.url + '?idAuthor=1';
	return this.http.post(getPokemonsURL,pokemon)
	.pipe(
        map((res:Pokemon) =>res),
        catchError(this.handleError)
	);
  }

  public updatePokemon(pokemon:Pokemon): Observable<Pokemon>{
	const getPokemonsURL = this.url + pokemon.id;
	return this.http.put(getPokemonsURL,pokemon)
	.pipe(
        map((res:Pokemon) =>res),
        catchError(this.handleError)
	);
  }

   // Error handling
   private handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Complete: ${error}\nError Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
