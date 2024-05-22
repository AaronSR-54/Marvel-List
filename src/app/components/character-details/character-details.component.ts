import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelCharacter } from '../../models/interfaces';
import { CharactersService } from '../../services/characters.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
  public faArrowLeft = faArrowLeft;

  public id: number = 0;
  public character: MarvelCharacter = {
    id: 0,
    name: '',
    alter: '',
    cover: '',
    description: '',
  };

  constructor(private router: Router, private route: ActivatedRoute, private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.route.params.subscribe((url) => {
      this.id = url['id']; // Access the 'id' parameter from the URL
      this.getCharacter();
    });
  }

  getCharacter() {
    this.charactersService.getCharacterByID(this.id).subscribe(
      (res) => {
        this.character = res;
      },
      (err) => {
        console.error('HTTP error request', err);
      }
    );
  }

  navigateToBack() {
    this.router.navigate(['']);
  }
}
