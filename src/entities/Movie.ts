import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import Base from './Base';
import Actor from './Actor';
import Director from './Director';
import Writer from './Writer';
import Genre from './Genre';
import Rating from './Rating';

@Entity('movies')
export default class Movie extends Base {
  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  releaseDate: Date;

  @Column()
  description: string;

  @Column()
  directorId: string;

  @OneToOne(() => Director)
  @JoinColumn()
  director: Director;

  @ManyToMany(() => Writer)
  @JoinTable({
    name: 'movie_writers',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'writer_id',
      referencedColumnName: 'id',
    },
  })
  writers: Writer[];

  @ManyToMany(() => Actor)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  actors: Actor[];

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'movie_genres',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];

  @OneToMany(() => Rating, rating => rating.movie)
  ratings?: Rating[];
}
