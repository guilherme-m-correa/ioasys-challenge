import Director from '@entities/Director';
import Writer from '@entities/Writer';
import Actor from '@entities/Actor';
import Genre from '@entities/Genre';

export default interface ICreateMovieDTO {
  name: string;
  duration: number;
  releaseDate: Date;
  description: string;
  director: Director;
  writers: Writer[];
  actors: Actor[];
  genres: Genre[];
}
