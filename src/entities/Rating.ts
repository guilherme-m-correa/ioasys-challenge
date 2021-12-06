import { Entity, Column, ManyToOne } from 'typeorm';
import Base from './Base';
import Movie from './Movie';
import User from './User';

@Entity('ratings')
export default class Rating extends Base {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  user?: User;

  @Column()
  movieId: string;

  @ManyToOne(() => Movie)
  movie?: Movie;

  @Column()
  score: number;
}
