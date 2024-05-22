import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MarvelEvent, MarvelEvents } from '../../../models/interfaces';
import { EventsService } from '../../../services/events.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-events-filter',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, FormsModule, FontAwesomeModule, NgxSkeletonLoaderModule],
  templateUrl: './events-filter.component.html',
  styleUrl: './events-filter.component.scss',
})
export class EventsFilterComponent implements OnInit {
  @Output() selectedEventID = new EventEmitter<number>();

  public faClose = faClose;

  events: MarvelEvents = {
    total: 0,
    list: [],
  };
  totalPages: number = 0;
  currentPage: number = 0;
  searchValue: string = '';
  selected: boolean = false;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getEvents(this.currentPage, this.searchValue).subscribe(
      (res) => {
        this.events = res;
        this.totalPages = Math.round(res.total / 5);
      },
      (err) => {
        console.error('HTTP error request', err);
      }
    );
  }

  filterEvents(event?: any) {
    if (event.key == 'Enter') this.currentPage = 0;
    if (this.searchValue == '' || event.key == 'Enter') this.getEvents();
  }

  selectEvent(event: MarvelEvent, index: number) {
    const card = document.getElementById('card ' + index);
    const cards = document.getElementsByClassName('card');

    Array.from(cards).forEach((element, i) => {
      if (index !== i) element.classList.remove('card--active');
    });

    if (!card?.classList.contains('card--active')) {
      card?.classList.add('card--active');
      this.selectedEventID.emit(event.id);
    } else {
      card?.classList.remove('card--active');
      this.selectedEventID.emit();
    }
  }

  changeCurrentPage(page: number) {
    this.currentPage = page;
    this.getEvents();
  }
}
