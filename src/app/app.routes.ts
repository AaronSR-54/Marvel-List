import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'character/:id',
    component: CharacterDetailsComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
