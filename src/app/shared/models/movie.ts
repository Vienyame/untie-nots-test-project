import {User} from './user';
import {Genre} from './genre.enum';

export interface Movie{
  id: string,
  title: string,
  year:string,
  releaseDate: string,
  runtime:string,
  genres: Genre[],
  director: User,
  actors: User[],
  plot: string,
  posterUrl: string,
}
