import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharactersService } from '../../services/characters.service';
import { MarvelCharacters } from '../../models/interfaces';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { EventsFilterComponent } from './events-filter/events-filter.component';
import { map } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CharacterCardComponent, 
    EventsFilterComponent, 
    FontAwesomeModule, 
    NgFor, 
    NgIf, 
    FormsModule, 
    NgxSkeletonLoaderModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public faClose = faClose;

  totalPages: number = 0;
  currentPage: number = 0;
  characters: MarvelCharacters = {
    total: 0,
    list: [],
  };
  searchValue: string = '';

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(eventID?: number) {
    this.charactersService.getCharacters(this.currentPage, this.searchValue, eventID).subscribe(
      (res) => {
        this.characters = res;
        this.totalPages = Math.round(res.total / 5);
      },
      (err) => {
        console.error("HTTP error request", err)
      });
  }

  filterCharacters(event?: any) {
    if (event.key == 'Enter') this.currentPage = 0;
    if (this.searchValue == '' || event.key == 'Enter') this.getCharacters();
  }

  selectEvent(eventID: number) {
    this.currentPage = 0;
    this.getCharacters(eventID);
  }

  changeCurrentPage(page: number) {
    this.currentPage = page;
    this.getCharacters();
  }
}
