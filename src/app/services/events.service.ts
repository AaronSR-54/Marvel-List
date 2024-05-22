import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventResponse } from '../models/event';
import { Observable, map } from 'rxjs';
import { MarvelEvents } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public baseUrl: string = 'http://gateway.marvel.com/v1/public/events';
  private apikey: string = '684a6b14882b44d1b6ad2afae032e37d';
  public ts: string = '1';
  private hash: string = '86e4b8412f1b2481d8db6b97a683c701';
  public limit: string = '5';
  private urlParams = `limit=${this.limit}&apikey=${this.apikey}&ts=${this.ts}&hash=${this.hash}`;

  constructor(private http: HttpClient) {}

  getEvents(page: number, name?: string): Observable<MarvelEvents> {
    const filterName = name ? `nameStartsWith=${name}` : '';

    const offset = page > 0 ? page * 5 : 1;
    const offsetParam = `&offset=${offset}`;

    const url = `${this.baseUrl}?${this.urlParams}${filterName}${offsetParam}`;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return {
          total: response.data.total,
          list: response.data.results.map((event: EventResponse) => {
            return {
              id: event.id,
              title: event.title.split(' (')[0],
              cover: event.thumbnail.path + '.' + event.thumbnail.extension,
            };
          }),
        };
      }),
    );
  }
}
