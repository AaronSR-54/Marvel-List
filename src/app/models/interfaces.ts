export interface MarvelCharacter {
  id: number;
  name: string;
  alter: string;
  cover: string;
  description: string;
}

export interface MarvelEvent {
  id: number;
  title: string;
  cover: string;
}

export interface MarvelEvents {
  total: number;
  list: MarvelEvent[];
}

export interface MarvelCharacters {
  total: number;
  list: MarvelCharacter[];
}
