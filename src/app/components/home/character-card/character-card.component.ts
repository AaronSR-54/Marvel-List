import { Component, Input } from '@angular/core';
import { MarvelCharacter } from '../../../models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() character: MarvelCharacter = {
    id: 0,
    name: '',
    alter: '',
    cover: '',
    description: '',
  };

  constructor(private router: Router) {}

  navigateToCharacterDetails() {
    this.router.navigate(['/character/' + this.character.id]);
  }
}
