import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(private http: HttpClient) { }

  getPokemons(offset = 0) {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      map(result => {
        return result['results'];
      }),
      map(pokemons => {
        return pokemons.map((poke, index) => {
          poke.image = this.getPokemonImg(index + offset + 1);
          poke.pokeIndex = offset + index + 1;
          
          return poke;
        });
      })
    );
  }
  getPokemonImg(index) {
    return `${this.imageUrl}${index}.png`;
  }
  findPokemon(search) {
      return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
        map(pokemon => {
          pokemon['image'] = this.getPokemonImg(pokemon['id']);
          pokemon['pokeIndex'] = pokemon['id'];
          return pokemon;
        })
      )
  }
  getPokemonDetails(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
         let sprites = Object.keys(poke['sprites']);
         poke['images'] = sprites
           .map(spriteKey => poke['sprites'] [spriteKey])
           .filter(img => img);
        return poke;
      })
    )
  }
}
