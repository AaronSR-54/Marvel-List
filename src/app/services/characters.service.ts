import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MarvelCharacter, MarvelCharacters } from '../models/interfaces';
import { CharacterResponse } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  public baseUrl: string = 'http://gateway.marvel.com/v1/public/characters';
  private apikey: string = '684a6b14882b44d1b6ad2afae032e37d';
  public ts: string = '1';
  private hash: string = '86e4b8412f1b2481d8db6b97a683c701';
  public limit: string = '12';
  private urlParams = `limit=${this.limit}&apikey=${this.apikey}&ts=${this.ts}&hash=${this.hash}`;

  constructor(private http: HttpClient) {}

  getCharacters(page: number, name?: string, eventID?: number): Observable<MarvelCharacters> {
    const filterName = name ? `&nameStartsWith=${name}` : '';
    const filterEvent = eventID ? `&events=${eventID}` : '';

    const offset = page > 0 ? page * 12 + 1 : 1;
    const offsetParam = `&offset=${offset}`;

    const url = `${this.baseUrl}?${this.urlParams}${filterName}${filterEvent}${offsetParam}`;

    
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return {
          total: response.data.total,
          list: response.data.results.map((character: CharacterResponse) => {
            return {
              id: character.id,
              name: character.name.split(' (')[0],
              alter: character.name.split(' (')[1] ? '(' + character.name.split(' (')[1] : '',
              cover: character.thumbnail.path + '.' + character.thumbnail.extension,
              description: character.description ? character.description : 'No description available',
            };
          }),
        };
      }),
    );
  }

  getCharacterByID(id: number): Observable<MarvelCharacter> {
    const url = `${this.baseUrl}/${id}?${this.urlParams}`;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        let character: CharacterResponse = response.data.results[0];
        return {
          id: character.id,
          name: character.name.split(' (')[0],
          alter: character.name.split(' (')[1] ? '(' + character.name.split(' (')[1] : '',
          cover: character.thumbnail.path + '.' + character.thumbnail.extension,
          description: character.description ? character.description : 'No description available',
        };
      }),
    );
  }
}
