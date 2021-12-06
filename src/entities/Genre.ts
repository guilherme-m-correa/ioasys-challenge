import { Column, Entity } from 'typeorm';
import Base from './Base';

@Entity('genres')
export default class Genre extends Base {
  @Column()
  name: string;
}
